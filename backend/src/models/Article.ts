import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';

class Article extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare imageUrl: string;
  declare category: string;
  declare author: string;
}

Article.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING }
}, {
  sequelize,
  modelName: 'Article',
  tableName: 'articles'
});

export default Article;