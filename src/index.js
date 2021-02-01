require('dotenv').config()

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const MongoAPI = require('./datasources/mongodb');
const resolvers = require('./resolvers');
const MongoClient = require('mongodb').MongoClient;
const { buildFederatedSchema } = require("@apollo/federation");

const context = async () => {
    try {
        const dotenv = require('dotenv').config()
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

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    dataSources,
    context
});

server.listen(4001).then(({ url }) => {
    console.log(`Running on ${url}`);
});