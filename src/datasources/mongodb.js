const { DataSource } = require('apollo-datasource');
const MongoClient = require('mongodb').MongoClient;

class MongoAPI extends DataSource {

    constructor() {
        super();
    }

    //initialize context
    initialize(config) {
        this.context = config.context;
    };

    async getCar({ id },  context ) {
        return await context.db.collection("processed").findOne({ "_id": id })
    };

}


module.exports = MongoAPI;