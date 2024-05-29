import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Users from './Users';
import Adresses from './Adresses';
import Payments from './Payments';
import Cupoms from './Cupoms';

const Orders = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING(255),
      defaultValue: 'criado',
    },
    total: {
      type: DataTypes.NUMBER,
    },
    totalDiscount: {
      field: 'total_discount',
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

);

Orders.BelongsTo(Users, {
  as: 'users',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_user_costumer',
    name: 'idUsersCostumers',
  },
});
Orders.BelongsTo(Users, {
  as: 'users',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_user_deliver',
    name: 'idUsersDelivers',
  },
});
Orders.BelongsTo(Adresses, {
  as: 'adresses',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_adress',
    name: 'idAdresses',
  },
});
Orders.BelongsTo(Payments, {
  as: 'payments',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_payment',
    name: 'idPayments',
  },
});
Orders.BelongsTo(Cupoms, {
  as: 'cupoms',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_cupom',
    name: 'idCupoms',
  },
});

export default Orders;
