/**
 * Created by Oakley Hall on 7/19/16.
 */
const Joi = require('joi');
const organizationValidator = Joi.string().required().description('the organization name').default('CorpOrg');
const assemblyValidator = Joi.string().required().description('the assembly name').default('landline');
const environmentValidator = Joi.string().required().description('the environment name').default('prod');
const platformValidator = Joi.string().required().description('the platform name').default('app-platform');
const cloudValidator = Joi.string().required().description('the cloud name').default('cloud-one');

module.exports = [
  { path: '/account/organizations.json',
    config:{}
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}/platforms/{platform}/variables.json',
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
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}/variables.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          organization: organizationValidator
        }
      }
    }
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}/releases.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          organization: organizationValidator
        }
      }
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
        }
      }
    }
  },
  { path: '/{organization}/assemblies/{assembly}/transition/environments/{environment}.json',
    config: {
      validate: {
        params: {
          environment: environmentValidator,
          assembly: assemblyValidator,
          organization: organizationValidator
        }
      }
    }
  },
  { path: '/{organization}/assemblies/{assembly}/operations/environments/{environment}/platforms.json',
    config: {
      validate: {
        params: {
          assembly: assemblyValidator,
          environment: environmentValidator,
          organization: organizationValidator
        }
      }
    }
  },
  { path: '/{organization}/assemblies/{assembly}/operations/environments/{environment}/' +
  'platforms/{platform}/components/compute/instances.json',
    config: {
      validate: {
        params: {
          platform: platformValidator,
          environment: environmentValidator,
          assembly: assemblyValidator,
          organization: organizationValidator
        }
      }
    }
  },
  { path: '/{organization}/assemblies/{assembly}/operations/environments/{environment}/' +
  'platforms/{platform}/components/fqdn/instances.json',
    config: {
      validate: {
        params: {
          platform: platformValidator,
          environment: environmentValidator,
          assembly: assemblyValidator,
          organization: organizationValidator
        }
      }
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
        }
      }
    }
  },
  { path: '/{organization}/clouds/{cloud}.json',
    config: {
      validate: {
        params: {
          organization: organizationValidator,
          cloud: cloudValidator
        }
      }
    }
  }
];