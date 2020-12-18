//Thing c'est le modèle pour la base de donnée pour un OBJET qui va être mis en vente

const mongoose = require("mongoose");

//les différents champs pour le schéma et la base mongoDB
const thingSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  userId: {type: String, required: true},
  price: {type: Number, required: true},
});

module.exports = mongoose.model('Thing', thingSchema);
