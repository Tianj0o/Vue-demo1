const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    username:{ type:String },
})

module.exports = mongoose.model('user',Schema)