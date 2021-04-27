const { gql } = require('apollo-server');


const typeDefs = gql`
type Query {
    """
    Fetches all sensor data for the given car id
    """
    fetchCars(id: ID!): [Car]

    """
    Fetches all ploty graphs
    """
    fetchAnalyticResults: [JsonGraph]

    """
    Fetches all ploty graphs for the driver with the given car id
    """
    fetchAnalyticResultsDriver(id: ID!): [JsonGraph]
}

type JsonGraph {
  title: String
  chartType : String
  graph : String
}

type Car{
  id : ID!
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
`;



module.exports = typeDefs;