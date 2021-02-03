const { Eureka } = require('eureka-js-client');
const { v4: uuidv4 }  = require('uuid');

const portEU = 4001;
const portUSA = 4002;


const eurekaEU = new Eureka({
  //cwd: `${__dirname}/config`,
  instance: {
    app: 'EU-SERVICE',
    hostName: 'localhost',
    ipAddr: '0.0.0.0', //use hostname as ip addr
    statusPageUrl: `http://localhost:${portEU}`,
    port: {
      '$': portEU,
      '@enabled': 'true',
    },
    vipAddress: 'eu-service',
    instanceId: uuidv4(),
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});

const eurekaEU2 = new Eureka({
  //cwd: `${__dirname}/config`,
  instance: {
    app: 'EU-SERVICE',
    hostName: 'localhost',
    ipAddr: '0.0.0.0',
    statusPageUrl: `http://localhost:${portEU}`,
    port: {
      '$': portEU,
      '@enabled': 'true',
    },
    vipAddress: 'eu-service',
    instanceId: uuidv4(),
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});

const eurekaUSA = new Eureka({
  //cwd: `${__dirname}/config`,
  instance: {
    app: 'USA-SERVICE',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: `http://localhost:${portUSA}`,
    port: {
      '$': portUSA,
      '@enabled': 'true',
    },
    vipAddress: 'usa-service',
    instanceId: uuidv4(),
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    // eureka server host / port
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});

module.exports = { eurekaEU, eurekaEU2, eurekaUSA };