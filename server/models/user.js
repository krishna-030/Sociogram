const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    followers : [{
        type : ObjectId,
        ref : "User"
    }],
    pic:{
        type:String,
        default: "https://res.cloudinary.com/krishnasociogram1234/image/upload/v1628495589/istockphoto-1223671392-612x612_goim1l.jpg"
    },
    following : [{
        type : ObjectId,
        ref : "User"
    }]
})

mongoose.model('User', userSchema)