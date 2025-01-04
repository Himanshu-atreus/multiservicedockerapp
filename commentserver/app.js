import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes

app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 3003; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
