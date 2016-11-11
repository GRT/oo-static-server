const Hapi = require('hapi');
const Good = require('good');
const _ = require('underscore');
const fs = require('fs');
const Swagger = require('hapi-swagger');
const chalk = require('chalk');

const server = Hapi.createServer('0.0.0.0', 4000, {cors:true});
const jsonDir = './apiresponses';
const defaultRouteDelay = 0;

// register the plugins and then start the server
server.pack.register( { plugin : Swagger, options : {} }, () => {
  server.pack.register( Good, err => {
    if (err) { throw err; }
    server.start( () => {
      server.log('info', 'OneOps Server running at: ' + server.info.uri );
    });
  });
});

_(require('./routes')).each( route => {
  route.config.tags = ['api'];
  route.config.auth = false;
  route.method = 'GET';
  route.handler = (request, reply) => {
    console.log( request.path );
    fs.readFile (jsonDir + request.path, {encoding:'utf8'}, (err, data) => {
      if(err) {
        reply(Hapi.error.badRequest('file not available'));
      } else {
        setTimeout(() => { reply({data:JSON.parse(data)}); }, defaultRouteDelay);
      }
    })
  };
  server.route(route);
});