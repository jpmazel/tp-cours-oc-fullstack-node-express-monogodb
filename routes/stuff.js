//création d'un router
const express = require("express");
const router = express.Router();

//importation du stuffControllers
const stuffControllers = require("../controllers/stuff");

//importation du middleware d'authentification
const auth = require('../middleware/auth');

//importation du middleware multer
const multer = require("../middleware/multer-config");

//---------------------------------------------------------------------------------------
//route POST pour envoyer des objets et fonction middleware
router.post("/", auth, multer, stuffControllers.createThing);
//-----------------------------------------------------------------------------------------
//route PUT pour modifier l'objet
router.put("/:id", auth, multer, stuffControllers.modifyThing);
//----------------------------------------------------------------------------------------
//route DELETE pour supprimer un objet
router.delete("/:id",  auth, stuffControllers.deleteThing);

//----------------------------------------------------------------------------------------
//c'est le frond-end qui mettra le id dans la requête
//la route pour afficher qu'un seul objet
router.get("/:id",  auth, stuffControllers.getOneThing);

//--------------------------------------------------------------------------------------
//les middleswares (stuff = matériel)
//route /api/stuff pour aller chercher les objets en base de données
router.get("/",  auth, stuffControllers.getAllThing);

//exportation du router
module.exports = router;
