module.exports = {
    Query: {
        fetchVehicle: async (_, { id }, context) => { //{dataSources},
            return await context.db.collection("processed").findOne({ "_id": id})
        },
        fetchAnalyticResults: async (_, __, context) => {
            return await context.db.collection("analysis").find({}).toArray()
        }
    }
}