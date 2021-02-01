require('dotenv').config()

const { ApolloServer } = require('apollo-server');
const typeDefsEU = require('./schema_eu');
const typeDefsUSA = require('./schema_usa');
const MongoAPI = require('./datasources/mongodb');
const resolversEU = require('./resolvers_eu');
const resolversUSA = require('./resolvers_usa');
const MongoClient = require('mongodb').MongoClient;
const { buildFederatedSchema } = require("@apollo/federation");

const context = async () => {
    try {
        const dbClient = new MongoClient(
            process.env.MONGO_DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )

        if (!dbClient.isConnected()) await dbClient.connect()
        db = dbClient.db('M-HH')
    } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e)
    }

    return { db }
}

const dataSources = () => ({
    mongoDB: new MongoAPI()
});

const serverEU = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs: typeDefsEU, resolvers: resolversEU }]),
    dataSources,
    context
});

const serverUSA = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs: typeDefsUSA, resolvers: resolversUSA }]),
    dataSources,
    context
});

serverEU.listen(4001).then(({ url }) => {
    console.log(`Running on ${url}`);
});

serverUSA.listen(4002).then(({ url }) => {
    console.log(`Running on ${url}`);
});