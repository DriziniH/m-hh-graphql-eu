const { gql } = require('apollo-server');


const typeDefs = gql`
type Query {
    fetchCars: [Car]
    fetchAnalyticResults: [JsonGraph]
    fetchAnalyticResultsDriver(id: ID!): [JsonGraph]
}

type Car{
  id : ID!
  unit: ID
  timestamp: Float

  kilometerTotal:Float
  kilometerStart:Float
  kmh: Float

  model: String
  labels: [String]
  fuel: String

  estimatedRange: Float

  travelTimeTotal: Float
  travelTime: Float
  
  oilLevel: Int 
  fuelLevel : Float
  breakFluidLevel : Float

  tirePressure : Float

  temperatureEngine : Float
  temperatureInside : Float
  temperatureOutside : Float
  temperatureBreaks : Float
  temperatureTires: Float

  breakPower: Float
  breakActive: Boolean 
  gasPower: Float
  gasActive: Boolean

  light: Boolean
  acc: Boolean

  rpm: Float
  oxygenLevel: Float

  engineWarning : Boolean
  breaksWarning : Boolean
  forwardCollisionWarning : Boolean
  airbag : Boolean
  serviceCall : Boolean
  lightingSystemFailure : Boolean

  lat: Float 
  lon: Float

  infotainmentOn: Boolean
  infotainmentService: String
  infotainmentVolume: Float
}

type JsonGraph {
  title: String
  type : String
  graph : String
}
`;



module.exports = typeDefs;