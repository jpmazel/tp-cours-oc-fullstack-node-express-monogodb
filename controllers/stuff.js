//importation du du modéle Thing base de donnée
const Thing = require("../models/Thing");

//importation node pour accéder aux systèmes de fichier du pc
const fs = require('fs');

console.log(Thing);

//logique métier qu'il y avait dans les routes 
//on exporte une fonction createThing pour la création d'un objet
exports.createThing = (req, res, next) => {
  console.log("CONTENU de req.body.thing");
  console.log(req.body.thing);

  const thingObject = JSON.parse(req.body.thing);

  console.log("CONTENU de thingObject");  
  console.log(thingObject);

  delete thingObject._id; //retirer le champ id avant de copier l'objet car l'id vient du serveur
  //création d'une instance du modèle
  const thing = new Thing({
    // title: req.body.title,
    //description: req.body.description,etc
    //utilisation de l'opérateur spread
    //   ça va copier les champs qu'il y a dans req.body
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log("CONTENU de l'objet thing : ");
  console.log(thing);

  //enregistrer l'objet dans la base de donné en appelant la méthode save
  thing
    .save()
    .then(() =>
      res.status(201).json({
        message: "Objet enregistré dans la base de donnée",
        contenu: req.body,
      })
    )
    .catch((error) => res.status(400).json({ error })); //équivalent de {error : error}

  // console.log("console.log du req.body : ");
  // console.log(req.body);
  // res.status(201).json({
  //   message: "Objet créé",
  //   contenu : req.body // renvoie le contenu de la requête dans la response
  // });
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
  {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body};
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id }) //2 arguments l'objet et la nouvelle version de l'objet
    .then(() => res.status(200).json({ message: "objet mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
};

//trouver l'objet dans la base de donnée
//une fois trouvé on extrait le nom du fichier à supprimer
//avec ce nom de fichier on le supprime avec fs.unlink
//dans le callback de fs.unlink on fait la suppression de l'objet dans la base
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
  .then(thing => {
    const filename = thing.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: `l'objet ${req.params.id} a été supprimé` }))
        .catch((error) => res.status(404).json({ error }));
    });
  })
  .catch(error => res.status(500).json({error}));  
};

exports.getOneThing = (req, res, next) => {
  //pour accéder à l'id   req.params.id
  console.log("_id: req.params.id");
  console.log({ _id: req.params.id });

  Thing.findOne({ _id: req.params.id })
    .then((lObjet) => res.status(200).json(lObjet))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllThing = (req, res, next) => {
  //utilisation de la méthode finf() pour avoir la liste complète
  Thing.find()
    .then((lesObjets) => res.status(200).json(lesObjets))
    .catch((error) => res.status(400).json({ error }));

  // const stuff = [
  //   {
  //     _id: "ezafdfs",
  //     title: "Matériel 1",
  //     description: "loremlo fdsfe zaezaeaze",
  //     imageUrl: "https://arts.konbini.com/files/2018/05/ethan-hoover-235936-unsplash.jpg",
  //     price: 4900,
  //     userId: "fdskjezae",
  //   },
  // ];
  // res.status(200).json(stuff);
}