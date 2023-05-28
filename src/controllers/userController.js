const createError = require('http-errors')
const users = require('../models/userModel')

const getUser = (req, res, next) => {
    try {
        res.status(200).send({
            message: 'User API is working.',
            
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { getUser };