require('dotenv').config()

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const ElasticAPI = require('./src/datasources/elasticsearch');
const resolvers = require('./src/resolvers');
const { eurekaClient } = require('./src/eureka_client')

const port = 4001;

const dataSources = () => ({
    elastic: new ElasticAPI()
});

const serverEU = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
});

function exitHandler() {
    eurekaClient.stop();
}
eurekaClient.on('deregistered', () => {
    process.exit();
});
process.on('SIGINT', exitHandler);

serverEU.listen(port).then(({ url }) => {
    console.log("Registering with Eureka for EU instance...");
    eurekaClient.start(function (error) {
        if (error) {
            console.log(error);
        }
    });
    console.log(`Running on ${url}`);
});
