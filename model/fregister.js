const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const fregister = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    reg:{
        type: String,
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
    },
})

const Fregister = new mongoose.model('Fregister', fregister);

module.exports = Fregister;