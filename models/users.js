module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },

      // JSON: Business Details
      businessDetails: {
        type: DataTypes.JSON,
        allowNull: true,
        set(value) {
          const defaults = {
            name: null,
            industry: null,
            website: null,
            location: null,
          };
          this.setDataValue('businessDetails', { ...defaults, ...value });
        },
        validate: {
          hasRequiredFields(value) {
            if (value) {
              const required = ['name'];
              for (const key of required) {
                if (!value.hasOwnProperty(key)) {
                  throw new Error(`businessDetails.${key} is required`);
                }
              }
            }
          },
        },
      },

      about: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      avatar: {
        type: DataTypes.STRING, // URL or path to image
        allowNull: true,
      },

      // JSON: Social Links
      socialLinks: {
        type: DataTypes.JSON,
        allowNull: true,
        set(value) {
          const defaults = {
            twitter: null,
            github: null,
            linkedin: null,
            website: null,
          };
          this.setDataValue('socialLinks', { ...defaults, ...value });
        },
        validate: {
          hasValidFormat(value) {
            if (value) {
              const isValidUrl = (url) => {
                try {
                  return url ? Boolean(new URL(url)) : true;  // empty/null
                } catch {
                  return false;
                }
              };
              for (const key in value) {
                if (!isValidUrl(value[key])) {
                  throw new Error(`Invalid URL in socialLinks: ${key}`);
                }
              }
            }
          },
        },
      },

      xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      isSuspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      verification_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      // JSON: Subscription
      subscription: {
        type: DataTypes.JSON,
        allowNull: true,
        set(value) {
          const defaults = {
            plan: 'free',
            subscribeDate: null,
            expiryDate: null,
            duration: 'monthly', // weekly, monthly, yearly
          };
          this.setDataValue('subscription', { ...defaults, ...value });
        },
        validate: {
          hasRequiredFields(value) {
            if (value) {
              const required = ['plan', 'subscribeDate', 'expiryDate', 'duration'];
              for (const key of required) {
                if (!value.hasOwnProperty(key)) {
                  throw new Error(`Missing required field in subscription: ${key}`);
                }
              }
            }
          },
        },
      },

      location: {
        type: DataTypes.GEOMETRY('POINT'),  // PostGIS geometry type
        allowNull: true,
        get() {
          const rawValue = this.getDataValue('location');
          if (!rawValue) return null;
          return {
            lat: rawValue.coordinates[1],  // PostGIS stores [LONGITUDE, LATITUDE]
            lng: rawValue.coordinates[0]
          };
        },
        set(value) {
          if (value && (value.lat !== undefined && value.lng !== undefined)) {
            this.setDataValue('location', {
              type: 'Point',  // GeoJSON format
              coordinates: [value.lng, value.lat]  // Note: lng first!
            });
          }
        }
      },
    },
    {
      tableName: 'users',
      timestamps: true, // adds createdAt and updatedAt
    }
  );

  return User;
};
