import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Cupoms = sequelize.define(
  'cupoms',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(255),
      defaultValue: 'percent',
      allowNull: false,
    },
    value: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    uses: {
      type: DataTypes.STRING(16),
      defaultValue: 999,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

);

export default Cupoms;
