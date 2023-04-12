const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    createdAt: Date,
    playerPokemons: Array,
    playerMoney: Number,
    playerExperience: Number,

})


const UserM = model("Users", UserSchema);

module.exports = UserM;