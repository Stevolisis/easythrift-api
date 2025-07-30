const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
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
    avatar: DataTypes.STRING,

    role: {
      type: DataTypes.ENUM('superadmin', 'moderator', 'finance', 'support'),
      defaultValue: 'moderator',
    },

    isSuspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    lastLogin: DataTypes.DATE,
  }, {
    tableName: 'admins',
    timestamps: true,
    indexes: [
      { fields: ['role'] },
      { fields: ['isSuspended'] },
    ],
    hooks: {
      beforeSave: async(admin) => {
        if (admin.role === 'superadmin' && admin.isSuspended) {
          throw new Error("Superadmin cannot be suspended");
        }

        if (admin.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      },
      beforeUpdate: (admin) => {
        if (admin.role === 'superadmin' && admin.changed('isSuspended') && admin.isSuspended) {
          throw new Error("Superadmin cannot be suspended");
        }
      },
    },
  });
  
    User.prototype.comparePassword = function (plainPassword) {
      return bcrypt.compare(plainPassword, this.password);
    };

    return Admin;
};
