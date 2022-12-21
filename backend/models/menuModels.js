const mongoose = require('mongoose')
const Schema = mongoose.Schema

let newMenus = new Schema({
    CoffeeName: {
        type: String,
        required: true
    },
    CoffeeNameTH: {
        type: String,
        required: true
    },
    PriceCoffee: {
        type: Number,
        required: true
    },
    timeCreated: {
        type: Date,
        default:()=>Date.now()
    },
    MenuImg: {
        type:String,
    }
})

const Menus = mongoose.model('Menus', newMenus)
module.exports = Menus