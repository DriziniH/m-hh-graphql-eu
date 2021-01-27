const { gql } = require('apollo-server');


const typeDefs = gql`
type Query {
    getCarEU(id: ID!) : CarEU
    getCarUSA(id: ID!) : CarUSA
    getCarChina(id: ID!) : CarChina

    getAnalysis : [Analysis]
}

interface Car {
    id : ID!
    timestamp: Float
}

type CarEU implements Car{
  kilometerTotal: String
  kilometerStart: Int
  kmh: Float

  id : ID!
  timestamp: Float
  model: String
  labels: String
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

type CarUSA implements Car{
  mileageTotal:Float
  mileageStart:Float
  mph: Float

  id : ID!
  timestamp: Float
  model: String
  labels: String
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

type CarChina {
  infotainmentOn: Boolean
  infotainmentService: String
  infotainmentVolume: Float
}

type Analysis {
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