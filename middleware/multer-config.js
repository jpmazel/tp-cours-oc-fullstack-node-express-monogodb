//multer pour gérer les uploads des images
//middleware pour enregistrer les images qui arrive du frontend
const multer = require("multer");

//préparation d'ubn dictionnaire
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//objet de configuration pour multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images")
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); 
    console.log("multer-config:contenu du name");
    console.log(name);

    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});

module.exports = multer({ storage }).single("image");
