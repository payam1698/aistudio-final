
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import mcmiRoutes from './routes/mcmiRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

/* Fix: Cast app to any to resolve TypeScript error 'No overload matches this call' when using express.json() middleware */
const app: any = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/mcmi', mcmiRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected...');
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

startServer();
