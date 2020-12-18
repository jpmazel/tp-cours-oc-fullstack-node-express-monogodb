const http = require('http'); // importation du package HTTP
const app = require('./app'); // importation du fichier .app

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); //retourne une nouvelle instance de http

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// console.log("je suis le server.js")

server.listen(port);


// //AVANT CODE AMELIORATION SERVEUR
// //importer le package http de node
// const http = require('http');

// //
// const app = require('./app');

// //
// app.set('port', process.env.PORT || 3000);

// //création du serveur
// const server = http.createServer(app);

// //le serveur doit écouter les requêtes envoyer
// server.listen(process.env.PORT || 3000);