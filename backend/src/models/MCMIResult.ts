import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class MCMIResult extends Model<InferAttributes<MCMIResult>, InferCreationAttributes<MCMIResult>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare reportData: object; // Calculated results from frontend scoring utility
  declare testDate: CreationOptional<Date>;
}

MCMIResult.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  reportData: { type: DataTypes.JSON, allowNull: false },
  testDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  sequelize,
  modelName: 'MCMIResult',
  tableName: 'mcmi_results'
});

User.hasMany(MCMIResult, { foreignKey: 'userId' });
MCMIResult.belongsTo(User, { foreignKey: 'userId' });

export default MCMIResult;