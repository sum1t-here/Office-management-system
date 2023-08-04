import express from 'express';
import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware.js';
import empRoute from './routes/emp.route.js';

// Create an Express application instance
const app = express();

// Middleware for parsing JSON data in the request body
app.use(express.json());
// Middleware for parsing URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies from the request
app.use(cookieParser());
// Middleware for logging HTTP requests to the console in a 'dev' format
app.use(morgan('dev'));

app.get('/ping', (req, res) => {
  res.send('Hello');
});

// Mount the employee route for handling '/api/v1/emp' requests
app.use('/api/v1/emp', empRoute);

// Handle all other routes that do not match any defined routes (404 Not Found)
app.all('*', (req, res) => {
  res.status(404).send('Oops!! 404 page not found');
});

// Middleware for error handling (will be executed when errors occur)
app.use(errorMiddleware);
export default app;
