const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");

//pour enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
  //hasher le mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      //pour l'enregistrer dans la base de donnée
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Utilisateur créé et sauvegardé" })
        )
        .catch((error) => res.status(400).json({ error }).send());
    })
    .catch((error) => res.status(500).json({ error }).send(console.log(error)));
};

//pour controler la validité de l'utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur inexistant" });
      }
      //le user existe on utilise bcrypt pour comparer le mot de passe envoyé par l'utilisateur
      //avec le hash qui est enregistré avec le user de la base de donnée
      bcrypt
        .compare(req.body.password, user.password) //fonction asynchrone retourne une promésse
        .then((valid) => {
          if (!valid) {
            //reçoit un booleean true ou false
            return res.status(401).json({ error: "mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(//3 arguments
              {userId: user._id},
              'RANDOM_TOKEN_SECRET',
              {expiresIn: '24h'}
              )            
          });
        })
        .catch((error) => res.status(500).json({ error })); //erreur serveur
    })
    .catch((error) => res.status(500).json({ error })); //erreur serveur
};
