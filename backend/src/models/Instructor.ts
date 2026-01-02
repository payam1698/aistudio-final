import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Instructor extends Model<InferAttributes<Instructor>, InferCreationAttributes<Instructor>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare title: string;
  declare imageUrl: string;
  declare specialties: string[]; // JSONB array
  declare bio: string;
}

Instructor.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  specialties: { type: DataTypes.JSONB, defaultValue: [] },
  bio: { type: DataTypes.TEXT }
}, {
  sequelize,
  modelName: 'Instructor',
  tableName: 'instructors'
});

export default Instructor;