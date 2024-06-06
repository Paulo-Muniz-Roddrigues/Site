import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Categories from './Categories';

const Products = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER(15, 2),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(2000),
    },
    description: {
      type: DataTypes.STRING(300),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Products.belongsTo(Categories, {
  as: 'categories',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_categories',
    name: 'idCategories',
  },
});

export default Products;
