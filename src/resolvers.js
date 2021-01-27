module.exports = {
    Query: {
        getCar: async (_, { id },  context) => { //{dataSources},
            //return await dataSources.mongoDB.getCar(id, context)
            return await context.db.collection("processed").findOne({ "_id": id })
        }
    }
}