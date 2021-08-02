const { Eureka } = require('eureka-js-client');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const port = 4001;

const eurekaClient = new Eureka({
  //cwd: `${__dirname}/config`,
  instance: {
    app: 'EU-GRAPHQL-SERVICE',
    hostName: 'localhost',
    ipAddr: '0.0.0.0', //use hostname as ip addr
    statusPageUrl: `http://localhost:${port}`,
    port: {
      '$': port,
      '@enabled': 'true',
    },
    vipAddress: 'eu-service',
    instanceId: uuidv4(),
    heartbeatInterval: 10000,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: "localhost",
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});


eurekaClient.config.eureka.maxRetries = 100;
eurekaClient.config.eureka.heartbeatInterval = 10000;

module.exports = { eurekaClient }