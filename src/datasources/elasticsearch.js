const { DataSource } = require('apollo-datasource');
const { Client } = require('@elastic/elasticsearch');
require('dotenv').config()

class ElasticAPI extends DataSource {

    constructor() {
        super();

        this.elasticClient = new Client({
            node: process.env.ES_URI,
        })
    }

    async fetchData(request) {
            return await this.elasticClient.search(request)
                .then(r => r.body.hits.hits.map(hit => hit._source))
                .catch(e => {
                    console.error(e);
                    return []
                });
    };
}

module.exports = ElasticAPI;