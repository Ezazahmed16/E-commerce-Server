const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Please enter a valid email.'
        }
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minlength: [6, 'Password can be atleast 6 character.'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
        
    },
    image: {
        type: String,     
    },
    address: {
        type: String,         
        required: [true, 'User address is required'],
    },
    phone: {
        type: Number,         
        required: [true, 'User Phone number is required'],
    },
    isAdmin: {
        type: Boolean,         
        default: false
    },
    isBanned: {
        type: Boolean,         
        default: false
    },
}, {timestamps: true})

const User = model('Users', userSchema)

module.exports = User;