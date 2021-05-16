const mongoose = require('mongoose');

const notify = new mongoose.Schema({
    notification:{
        type: String,
        required: true
    }
})

const Notify = new mongoose.model('Notification', notify);

module.exports = Notify;