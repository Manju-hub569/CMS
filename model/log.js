const mongoose = require('mongoose');

const login = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const Login = new mongoose.model('Login', login);
const createDoc = async () => {
    try {
        const mylog = new Login({
            name:'Admin',
            password:'Admin'
        })
        const logres = await mylog.save();
    } catch(e) {
        console.log(e);
    }
}
createDoc();

module.exports = Login;