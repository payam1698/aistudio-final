import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';
import Instructor from './Instructor';

class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: CreationOptional<string>;
  declare price: number;
  declare imageUrl: CreationOptional<string>;
  declare instructorId: number;
  declare syllabus: CreationOptional<object>; // JSONB logic from Postgres to JSON in MySQL
}

Course.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.BIGINT, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  instructorId: {
    type: DataTypes.INTEGER,
    references: { model: Instructor, key: 'id' }
  },
  syllabus: { type: DataTypes.JSON }
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses'
});

Instructor.hasMany(Course, { foreignKey: 'instructorId' });
Course.belongsTo(Instructor, { foreignKey: 'instructorId', as: 'instructor' });

export default Course;