const mongoose = require("mongoose");

const User = new mongoose.Schema({
    user_id : {
        type:Number,
        require:true
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    mobile: {
        type: String, 
        require: true,
    },
    address: {
        type: String, 
        require: true,
    },
    rating : {
        type: Number,
        require: true,
        deafult : 0
    }
});

const userModel = mongoose.model('User', User);

module.exports = userModel;