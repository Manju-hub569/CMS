const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const sregister = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    roll:{
        type:String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
})


const Sregister = new mongoose.model('Sregister', sregister);

module.exports = Sregister;