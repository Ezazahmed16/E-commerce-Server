const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = async (option = {}) => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, option);
        console.log('Mongodb Connection is done')

        mongoose.connection.on('error', (error) => {
            console.log('Mongodb Connection Error', error)
        })
    }catch(error){
        console.log(error)
    }
}

module.exports = connectdb;