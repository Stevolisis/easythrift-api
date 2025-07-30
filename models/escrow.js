module.exports = (sequelize, DataTypes) => {
  const Escrow = sequelize.define('Escrow', {
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    adId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'ads', key: 'id' },
    },
    status: {
      type: DataTypes.ENUM('initiated', 'paid', 'delivered', 'confirmed', 'released', 'cancelled', 'disputed'),
      defaultValue: 'initiated'
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    releasedAt: {
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'escrows',
    timestamps: true,
    indexes: [
      { fields: ['buyerId'] },
      { fields: ['sellerId'] },
      { fields: ['adId'] },
      { fields: ['status'] },
      { fields: ['createdAt'] },
    ]
  });

  Escrow.associate = (models) => {
    Escrow.belongsTo(models.User, { as: 'buyer', foreignKey: 'buyerId' });
    Escrow.belongsTo(models.User, { as: 'seller', foreignKey: 'sellerId' });
    Escrow.belongsTo(models.Ad, { foreignKey: 'adId', as: 'ad' });
  };

  return Escrow;
};