import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Course from './Course';

class Enrollment extends Model<InferAttributes<Enrollment>, InferCreationAttributes<Enrollment>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare courseId: number;
  declare paymentStatus: CreationOptional<'pending' | 'completed' | 'installment'>;
}

Enrollment.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' }
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: { model: Course, key: 'id' }
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'installment'),
    defaultValue: 'pending'
  }
}, {
  sequelize,
  modelName: 'Enrollment',
  tableName: 'enrollments'
});

export default Enrollment;