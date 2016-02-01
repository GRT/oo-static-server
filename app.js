
// load the framework and necessary plugins/libs

var Hapi      = require('hapi');
var Good      = require('good');              // for logging
var _         = require('underscore');
var fs        = require('fs');
var Swagger   = require('hapi-swagger');      // generate API documentation
var Joi       = require('joi');              // schema validation
var chalk     = require('chalk');

// create a server on port 4000.
var server = Hapi.createServer('0.0.0.0', 4000, {cors:true});

var jsonDir = './apiresponses';

var organizationValidator = Joi.string().required().description('the organization name').default('CorpOrg');
var assemblyValidator     = Joi.string().required().description('the assembly name').default('landline');
var environmentValidator  = Joi.string().required().description('the environment name').default('prod');
var platformValidator     = Joi.string().required().description('the platform name').default('app-platform');
var cloudValidator        = Joi.string().required().description('the cloud name').default('cloud-one');
var variableValidator     = Joi.string().required().description('the variable name').default('appVersion');
var componentValidator    = Joi.string().required().description('the component name').default('compute');

var defaultRouteDelay     = 0;

// register the plugins and then start the server
server.pack.register({plugin:Swagger, options:{}}, function() {
  server.pack.register(Good, function (err) {
    if (err) {
      throw err; // something bad happened loading the plugin
    }

    server.start(function () {
      server.log('info', 'OneOps Server running at: ' + server.info.uri);
    });
  });
});

var routes = [
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}/platforms/{platform}/variables.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          platform: platformValidator,
          organization: organizationValidator
        }}

    }
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}/variables.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          organization: organizationValidator
        }}

    }
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}/releases.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          organization: organizationValidator
        }}

    }
  },
  { path: '/{organization}/assemblies/{assembly}/operations/environments/{environment}/platforms.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          organization: organizationValidator
        }}

    }
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}/platforms/{platform}.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          platform: platformValidator,
          organization: organizationValidator
        }}

    }
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}/platforms/{platform}/edit.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          platform: platformValidator,
          organization: organizationValidator
        }
      }
    }
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          organization: organizationValidator
        }}

    }
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}.json',
    config: {
      validate: {
        params: {
          environment: environmentValidator,
          assembly: assemblyValidator,
          organization: organizationValidator
        }}

    }
  },
  { path: '/{organization}/assemblies.json',
    config: {
      validate: {
        params: {
          organization: organizationValidator
        }}

    }
  },
  { path: '/{organization}/clouds/{cloud}/variables.json',
    config: {
      validate: {
        params: {
          organization: organizationValidator,
          cloud: cloudValidator
        }}

    }
  },
  { path: '/{organization}/clouds/{cloud}.json',
    config: {
      validate: {
        params: {
          organization: organizationValidator,
          cloud: cloudValidator
        }}

    }
  }
];

_(routes).each(function (route) {
  route.config.tags = ['api'];
  route.config.auth = false;
  route.method      = 'GET';
  route.handler     = function (request, reply) {
    fs.readFile (jsonDir + request.path, {encoding:'utf8'}, function(err, data) {
      if(err) {
        var error = Hapi.error.badRequest('file not available');
        reply(error);
      } else {
        setTimeout(function() {
          reply(JSON.parse(data));
        }, defaultRouteDelay);
      }
    })
  };
  server.route(route);
});