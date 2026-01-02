import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

/* Fix: Implemented Sequelize InferAttributes and InferCreationAttributes to provide proper typing for the User model, resolving 'init' and static method errors like findOne, findByPk, and create in the controllers. */
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare mobile: string;
  declare nationalCode: string; // Used as password
  declare fullNameFa: string;
  declare fullNameEn: CreationOptional<string>;
  declare fatherName: CreationOptional<string>;
  declare birthPlace: CreationOptional<string>;
  declare birthDate: {
    day: string;
    month: string;
    year: string;
  };
  declare age: CreationOptional<number>;
  declare gender: 'male' | 'female';
  declare education: CreationOptional<string>;
  declare maritalStatus: CreationOptional<string>;
  declare role: CreationOptional<'admin' | 'user'>;
  declare mcmiStatus: CreationOptional<'none' | 'approved'>;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  mobile: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  nationalCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullNameFa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullNameEn: {
    type: DataTypes.STRING
  },
  fatherName: {
    type: DataTypes.STRING
  },
  birthPlace: {
    type: DataTypes.STRING
  },
  birthDate: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: false
  },
  education: {
    type: DataTypes.STRING
  },
  maritalStatus: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  },
  mcmiStatus: {
    type: DataTypes.ENUM('none', 'approved'),
    defaultValue: 'none'
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});

export default User;