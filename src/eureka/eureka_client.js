const { Eureka } = require('eureka-js-client');

const portEU = 4001;
const portUSA = 4002;
const portEU2 = 4003;


const eurekaEU = new Eureka({
  //cwd: `${__dirname}/config`,
  instance: {
    app: 'EU-SERVICE',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': portEU,
      '@enabled': 'true',
    },
    vipAddress: 'jq.test.something.com',
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
    ipAddr: '127.0.0.1',
    port: {
      '$': portEU2,
      '@enabled': 'true',
    },
    vipAddress: 'jq.test.something.com',
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
    port: {
      '$': portUSA,
      '@enabled': 'true',
    },
    vipAddress: 'jq.test.something.com',
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