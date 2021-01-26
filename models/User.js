const mongoose = require('mongoose')

//define a mongoose Schema
let userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique:true},
    dateOfBirth: Date,
    phone: Number
})

//export the mongoose model
module.exports = mongoose.model('user', userSchema)