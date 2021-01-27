module.exports = {
    Query: {
        getCarEU: async (_, { id }, context) => { //{dataSources},
            return await context.db.collection("processed").findOne({ "_id": id, "_unit": process.env.UNIT_ID_EU })
        },
        getCarUSA: async (_, { id }, context) => {
            return await context.db.collection("processed").findOne({ "_id": id, "_unit": process.env.UNIT_ID_USA })
        },
        getCarChina: async (_, { id }, context) => {
            return await context.db.collection("processed").findOne({ "_id": id, "_unit": process.env.UNIT_ID_CHINA })
        }

        ,
        getAnalysis: async (_, __, context) => {
            console.log(context.db.collection("analysis").find({}).toArray())
            return await context.db.collection("analysis").find({}).toArray()
        }
    }
}