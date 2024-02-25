const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Location = new Schema({
    location_id : {
        type:Number,
        require:true 
    },
    user_id : {
        type:Number,
        require:true
    },
    coordinates :{
        latitude : {
            type:Number,
            require:true
        },
        longitude : {
            type:Number,
            require:true
        }
    },
    type : {
        type: String,
        enum : ['Public', 'Private'],
        require: true,
    },
    category : {
        type: String,
        enum : ['Personal', 'Food', 'Monument', 'Shopping', 'Miscellaneous'],
        require: true,
    },
    tag : {
        type: String,
        require: true,
    }, 
    description : {
        type: String,
        require: true,
    },
    place_name : {
        type: String,
        require: true,
    }, 
    img_url : {
        type: String,
        require: false,
    },
    likes_by : [
        {
            liked_by_id : {
                type:Number,
                required:true 
            },
            value:{
                type:Number,
                required:true
            }
        }
    ],
}, {timestamps: true})

module.exports = mongoose.model('Location', Location);