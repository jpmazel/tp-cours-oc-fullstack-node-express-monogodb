const mongoose = require("mongoose");

//pour controler le mail, n'avoir qu'un seul mail dans la base de donnée, pas de doublon
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator); // on applique la méthode plugin

module.exports = mongoose.model("User", userSchema);