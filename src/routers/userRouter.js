const express = require('express');
const { getUser } = require('../controllers/userController');
const userRouter = express.Router()


userRouter.get('/api/users', getUser); 

module.exports = userRouter;