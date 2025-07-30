module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    reporterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    targetType: {
      type: DataTypes.ENUM('user', 'ad'),
      allowNull: false
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('open', 'reviewed', 'resolved'),
      defaultValue: 'open'
    }
  }, {
    tableName: 'reports',
    timestamps: true,
    indexes: [
      { fields: ['reporterId'] },
      { fields: ['targetType', 'targetId'] },
      { fields: ['status'] },
    ],
  });

  Report.associate = (models) => {
    Report.belongsTo(models.User, { foreignKey: 'reporterId', as: 'reporter' });
  };
  return Report;
};