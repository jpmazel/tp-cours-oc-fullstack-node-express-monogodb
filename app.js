//Importer le framework Express
const express = require("express");

//Importation de body-parser : Analyser les corps de requête entrants dans un middleware
// avant vos gestionnaires, disponible sous la propriété req.body
//transformer le corps de la requéte en JSON , en objet JS utilisable
const bodyParser = require('body-parser');

//importation database mongoose
const mongoose = require("./db/db");

//importation node pour accéder au dossier image sur le pc
const path = require('path');

//importation du routeur
const stuffRoutes = require("./routes/stuff");
// console.log(express);

const userRoutes = require("./routes/user");

//logger requête
const morgan = require('morgan');

//créer une application Express
const app = express();

//logger des requêtes
app.use(morgan("dev"));
//-----------------------------------------------------------


//pour les problèmes de CORS-middleware générale-pas de route
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//transformer le corps (le body) javascript en objet utilisable
app.use(bodyParser.json());



// app.use("/images", express.static(path.join(__dirname, 'images')));
app.use('/images', express.static(path.join(__dirname, 'images')));

//utilisation des routes et on met le début de la route et on utilise le router stuffRoutes
app.use("/api/stuff", stuffRoutes);

// app.use(function (err, req, res, next) {
//   console.log('This is the invalid field ->', err.field)
//   next()
// })

app.use("/api/auth", userRoutes);




//Exporter l'application
module.exports = app;
