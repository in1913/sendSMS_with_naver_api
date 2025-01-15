import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import userRoutes from './routes/user.js';
import projectRoutes from './routes/project.js';
import connect from './services/connect.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Connect to database
connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', apiRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});