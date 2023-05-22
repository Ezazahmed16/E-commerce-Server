const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit');
const userRouter = require('./src/routers/userRouter');

const app = express();

require('dotenv').config()

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many request from this IP. Please try again later."
})

// Define middleware
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded data
app.use(morgan('dev')); // show api method and time
app.use(xss());
app.use(rateLimiter); // rateLimiter is set limitation of API calling.


// User Router  
app.use(userRouter);


// Define routes
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'API is working Fine.'
  })
});

//clint error handeling 
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
})
//Server error handeling 
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message
  })
})

// Start the server
const port = 5000; // Specify the port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});