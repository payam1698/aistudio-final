import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Instructor extends Model<InferAttributes<Instructor>, InferCreationAttributes<Instructor>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare title: string;
  declare imageUrl: CreationOptional<string>;
  declare specialties: CreationOptional<string[]>; // JSON array
  declare bio: CreationOptional<string>;
}

Instructor.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  specialties: { type: DataTypes.JSON },
  bio: { type: DataTypes.TEXT }
}, {
  sequelize,
  modelName: 'Instructor',
  tableName: 'instructors'
});

export default Instructor;