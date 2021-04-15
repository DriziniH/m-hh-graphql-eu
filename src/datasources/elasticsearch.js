const { DataSource } = require('apollo-datasource');
const { Client } = require('@elastic/elasticsearch')

class ElasticAPI extends DataSource {

    constructor() {
        super();

        this.elasticClient = new Client({
            node: 'http://localhost:9200',
        })
    }

    async fetchData(request) {
        return await this.elasticClient.search(request)
        .then(r =>r.body.hits.hits.map(hit => hit._source)) 
        .catch(e => {
            console.error(e);
        });
    };
}

module.exports = ElasticAPI;