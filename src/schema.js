const { gql } = require('apollo-server');


const typeDefs = gql`
type Query {
    fetchCar(id: ID!) : Car
    fetchAnalyticResults: [AnalyticResults]
}

type Car{
  _id : ID!
  _unit: ID
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

type AnalyticResults {
  _id: ID
  label: String
  graphs: [JsonGraph]
}

type JsonGraph {
  type: String
  title: String
  chartType: String
  jsonGraph: String
}
`;



module.exports = typeDefs;