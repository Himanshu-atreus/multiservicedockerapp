import express from 'express';
import cookieParser from 'cookie-parser';
import blogRoutes from './routes/blogRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/blogs', blogRoutes);

const PORT = process.env.PORT || 3002; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
