import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

/* Fix: Implemented Sequelize InferAttributes and InferCreationAttributes for the MCMIResult model to resolve 'init' and static method errors such as 'findAll' and 'create' in controllers. */
class MCMIResult extends Model<InferAttributes<MCMIResult>, InferCreationAttributes<MCMIResult>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare reportData: object; // The full object from calculateScores
  declare testDate: CreationOptional<Date>;
}

MCMIResult.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  reportData: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  testDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'MCMIResult',
  tableName: 'mcmi_results'
});

/* Fix: Association methods like hasMany and belongsTo are inherited from the Model class; proper TypeScript typing on User and MCMIResult ensures these are recognized. */
User.hasMany(MCMIResult, { foreignKey: 'userId' });
MCMIResult.belongsTo(User, { foreignKey: 'userId' });

export default MCMIResult;