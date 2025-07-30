module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    revieweeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    escrowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'escrows', key: 'id' }
    },
    adId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'ads', key: 'id' }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'reviews',
    timestamps: true,
    indexes: [
      { fields: ['reviewerId'] },
      { fields: ['revieweeId'] },
      { fields: ['escrowId'] },
      { fields: ['adId'] },
      {
        unique: true,
        fields: ['reviewerId', 'adId'],
        name: 'unique_reviewer_per_ad'
      }
    ],
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'reviewerId', as: 'reviewer' });
    Review.belongsTo(models.User, { foreignKey: 'revieweeId', as: 'reviewee' });
    Review.belongsTo(models.Ad, { foreignKey: 'adId', as: 'ad' });
    Review.belongsTo(models.Escrow, { foreignKey: 'escrowId', as: 'escrow' });
  };

  return Review;
};