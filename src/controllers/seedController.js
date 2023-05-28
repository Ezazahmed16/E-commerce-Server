const createError = require('http-errors')
const Users = require('../models/userModel')
const data = require('../data')

const seedUser = async (req, res, next) => {
    try {
        // delete exesting users
        await Users.deleteMany({})

        //insert new users
        const users = await Users.insertMany(data.users)

        //Successful response
        return res.status(201).json(users) 
    } catch (error) {
        next(error)
    }
}

module.exports = { seedUser };