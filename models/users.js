const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'vendor'),
      allowNull: false,
      defaultValue: 'user',
    },
    businessDetails: {
      type: DataTypes.JSONB,
      allowNull: true,
      set(value) {
        const defaults = {
          name: null,
          legalName: null,
          taxId: null,
          industry: null,
          description: null,
          address: {
            street: null,
            city: null,
            state: null,
            postalCode: null,
            country: null,
          },
          phone: null,
          contactEmail: null,
          openingHours: null,
          isVerified: false,
          verificationDocuments: [],
          socialMedia: {
            facebook: null,
            instagram: null,
            linkedIn: null,
          },
        };
        this.setDataValue('businessDetails', {
          ...defaults,
          ...value,
          address: { ...defaults.address, ...(value?.address || {}) },
          socialMedia: { ...defaults.socialMedia, ...(value?.socialMedia || {}) },
        });
      },
      validate: {
        onlyVendorsCanHaveBusinessDetails(value) {
          if (value && this.role !== 'vendor') {
            throw new Error('Only vendors can have businessDetails');
          }
        },
        hasRequiredFields(value) {
          if (value && this.role === 'vendor') {
            const required = [
              'name',
              'legalName',
              'industry',
              'address.street',
              'address.city',
              'address.country',
              'contactEmail',
            ];
            for (const path of required) {
              const keys = path.split('.');
              let val = value;
              for (const key of keys) {
                val = val?.[key];
                if (val === undefined) break;
              }
              if (!val) throw new Error(`Missing required business field: ${path}`);
            }
          }
        },
      },
    },
    isBusinessApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    avatar: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
          hasRequiredFields(value) {
              if (!value?.url || !value?.public_id) {
                  throw new Error('Cloudinary image requires url and public_id');
              }
          }
      }
    },
    about: DataTypes.TEXT,
    whatsappNumber: DataTypes.STRING,
    xp: { type: DataTypes.INTEGER, defaultValue: 0 },
    isSuspended: { type: DataTypes.BOOLEAN, defaultValue: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    lastLogin: DataTypes.DATE,
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('location');
        if (!rawValue) return null;
        return {
          lat: rawValue.coordinates[1],
          lng: rawValue.coordinates[0],
        };
      },
      set(value) {
        if (value?.lat !== undefined && value?.lng !== undefined) {
          this.setDataValue('location', {
            type: 'Point',
            coordinates: [value.lng, value.lat],
          });
        }
      },
    },
  }, {
    tableName: 'users',
    timestamps: true,
    indexes: [
      { fields: ['role'] },
      { fields: ['isVerified'], name: 'users_verification_idx' },
      { fields: ['isSuspended'], name: 'users_suspension_idx' },
      {
        fields: ['location'],
        using: 'GIST',
        name: 'users_location_gist_idx',
      },
      {
        fields: ['role', sequelize.literal(`("businessDetails"->>'industry')`)],
        where: { role: 'vendor' },
        name: 'users_business_industry_idx',
      }
    ],
    hooks: {
      beforeSave: async(user) => {
        if (user.businessDetails && !user.businessDetails.name) {
          user.businessDetails = null;
        }

        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }

      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Ad, { foreignKey: 'authorId', as: 'ads' });
    User.hasMany(models.Escrow, { foreignKey: 'buyerId', as: 'purchases' });
    User.hasMany(models.Escrow, { foreignKey: 'sellerId', as: 'sales' });
  };

  User.prototype.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  };

  return User;
};
