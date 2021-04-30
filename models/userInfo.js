const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userInfo = new Schema({
    userName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    occupation : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model('userInfo',userInfo);  