import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Orders from './Orders';
import Products from './Products';

const OrdersProducts = sequelize.define(
  'orders_products',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    priceProducts: {
      field: 'price_products',
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

OrdersProducts.BelongsTo(Orders, {
  as: 'orders',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_order',
    name: 'idOrders',
  },
});
OrdersProducts.BelongsTo(Products, {
  as: 'products',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_product',
    name: 'idProducts',
  },
});

export default OrdersProducts;
