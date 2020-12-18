//importer mongoose pour la base de donnée
const mongoose = require('mongoose');

//connection à la base de donnée mongoDB
mongoose.connect(
  'mongodb+srv://dupon:36kDr2w6yJMak5qf@cluster0.7fts7.mongodb.net/test>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//------------------------------------------------------------

module.exports = mongoose;
