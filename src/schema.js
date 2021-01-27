const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    getCar(id: ID!) : Car
  },

type Car {
    id : ID!
    timestamp: Float
    model: String
    labels: String
    fuel: String

    mileageTotal:Float
    mileageStart:Float
  
    kilometerTotal: Float
    kilometerStart: Float
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
    kmh: Float
    mph: Float
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
