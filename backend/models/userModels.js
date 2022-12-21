const mongoose = require("mongoose");
const Schema = mongoose.Schema

let newUsers = new Schema({
    username: {
        type: String
    },
    email: {
        unique: true,
        type: String
    },
    password: {
        type: String
    }
})

const User = mongoose.model('User-info', newUsers);
module.exports = User