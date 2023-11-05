// server.js

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/dbConn');
app.use('/public', express.static('public'));
app.use(express.json({ limit: '5gb' }));

const mediaRouter = require('./router/mediarouter');

const cors = require('cors');
const logger = require('morgan');
require('dotenv').config({ path: './.env' });
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
connectDB();


app.use('/media', mediaRouter);


process.on('unhandledRejection', (reason, promise) => { 
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB is connected successfully.');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


