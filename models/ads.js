module.exports = (sequelize, DataTypes) => {
    const Ad = sequelize.define('Ad', {
        // Core Metadata
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(120),
            allowNull: false,
            validate: {
                len: [10, 120]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [30, 2000]
            }
        },

        // Cloudinary Media Fields (consistent with user avatar)
        coverImage: {
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
        gallery: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            defaultValue: [],
            validate: {
                isValidGallery(value) {
                    if (value.some(img => !img?.url || !img?.public_id)) {
                        throw new Error('Each gallery image requires url and public_id');
                    }
                },
                maxLength(value) {
                    if (value?.length > 10) throw new Error('Max 10 gallery images');
                }
            }
        },

        // Classification
        category: {
            type: DataTypes.ENUM(
                'electronics',
                'furniture',
                'clothing',
                'vehicles',
                'property',
                'services',
                'other'
            ),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('sell', 'rent', 'service', 'request'),
            defaultValue: 'sell'
        },
        condition: {
            type: DataTypes.ENUM('new', 'used', 'refurbished'),
            defaultValue: 'used',
            validate: {
                validForType(value) {
                    if (this.type === 'service' && value !== null) {
                        throw new Error('Services cannot have condition');
                    }
                }
            }
        },

        // Pricing
        price: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            validate: {
                min: 0.01
            }
        },
        discountPrice: {
            type: DataTypes.DECIMAL(12, 2),
            validate: {
                isLessThanPrice(value) {
                    if (value && parseFloat(value) >= parseFloat(this.price)) {
                        throw new Error('Discount must be lower than price');
                    }
                }
            }
        },
        isPriceNegotiable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        priceHistory: {
            type: DataTypes.JSONB,
            defaultValue: []
        },

        // Location (consistent with User model)
        location: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
            get() {
                const rawValue = this.getDataValue('location');
                if (!rawValue) return null;
                return {
                    lat: rawValue.coordinates[1],
                    lng: rawValue.coordinates[0]
                };
            },
            set(value) {
                if (value && (value.lat !== undefined && value.lng !== undefined)) {
                    this.setDataValue('location', {
                        type: 'Point',
                        coordinates: [value.lng, value.lat]
                    });
                }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },

        // Complete Category-Specific Attributes
        attributes: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
            validate: {
                meetsCategoryRequirements(value) {
                    const categoryRequirements = {
                        electronics: {
                            required: ['brand', 'model'],
                            optional: ['warranty', 'color', 'storage', 'condition_details']
                        },
                        furniture: {
                            required: ['material', 'dimensions'],
                            optional: ['color', 'assembly_required', 'style']
                        },
                        clothing: {
                            required: ['size', 'gender', 'material'],
                            optional: ['color', 'brand', 'season']
                        },
                        vehicles: {
                            required: ['make', 'model', 'year', 'mileage'],
                            optional: ['fuel_type', 'transmission', 'color', 'condition']
                        },
                        property: {
                            required: ['type', 'area', 'bedrooms'],
                            optional: ['furnished', 'amenities', 'floor']
                        },
                        services: {
                            required: ['service_type', 'availability'],
                            optional: ['experience_years', 'certifications']
                        }
                    };
                    
                    const requirements = categoryRequirements[this.category] || {};
                    const requiredFields = requirements.required || [];
                    
                    requiredFields.forEach(field => {
                        if (!value[field]) throw new Error(`Missing required attribute: ${field}`);
                    });
                }
            }
        },

        // Engagement Metrics
        viewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        outreachLevel: {
            type: DataTypes.ENUM('local', 'regional', 'national'),
            defaultValue: 'local'
        },

        // Moderation
        status: {
            type: DataTypes.ENUM('active', 'pending', 'suspended', 'sold'),
            defaultValue: 'pending'
        },
        suspensionReason: DataTypes.TEXT,
        editCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        lastEditedAt: DataTypes.DATE

    }, {
        tableName: 'ads',
        timestamps: true,
        indexes: [
            // Single-column indexes
            { fields: ['category'] },
            { fields: ['type'] },
            { fields: ['authorId'] },
            { fields: ['price'] },
            { fields: ['createdAt'] },
            { fields: ['status'] },

            // Composite indexes
            {
                name: 'ads_category_price_idx',
                fields: ['category', 'price']
            },
            {
                name: 'ads_location_gist_idx',
                fields: ['location'],
                using: 'GIST'
            },

            // Full-text search
            {
                type: 'FULLTEXT',
                name: 'ads_search_idx',
                fields: ['title', 'description']
            }
        ],
        hooks: {
        beforeUpdate: (ad) => {
            if (ad.changed('price')) {
                ad.priceHistory = [
                    ...ad.priceHistory,
                    { 
                        date: new Date(), 
                        price: ad.previous('price'),
                        changedBy: ad.authorId 
                    }
                ];
                ad.editCount += 1;
                ad.lastEditedAt = new Date();
            }
        }
        }
    });

    Ad.associate = (models) => {
        Ad.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });
        Ad.hasOne(models.Escrow, { foreignKey: 'adId', as: 'escrow' });
    };
    return Ad;
};