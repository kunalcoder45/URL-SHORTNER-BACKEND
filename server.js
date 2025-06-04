import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import cors from 'cors';
import connectDB from './src/config/db.js';
import short_url from './src/routes/short_url.js';
import { redirectFromShortUrl } from './src/controllers/short_url.js';
import errorHandler from './src/middleware/errorHandler.js';

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("hello"));
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api/create', short_url);

app.get('/:id', redirectFromShortUrl);

app.use(errorHandler);

app.listen(5000, () => {
  connectDB();
  console.log('Server is running on http://localhost:5000');
});
