const getWearingParts = function (wearingPartsAvg) {
    var x = [];
    var breaksHealth = [];
    var mufflerHealth = [];
    var engineHealth = [];
    var tireHealth = [];
    var gearsHealth = [];
    var batteryHealth = [];

    for (row of wearingPartsAvg) {
        x.push(row.year + "-" + row.month + "-" + row.day);
        breaksHealth.push(row.breaksHealth);
        mufflerHealth.push(row.mufflerHealth);
        engineHealth.push(row.engineHealth);
        tireHealth.push(row.tireHealth);
        gearsHealth.push(row.gearsHealth);
        batteryHealth.push(row.batteryHealth);
    }

    var breaksHealthTrace = {
        x: x,
        y: breaksHealth,
        mode: 'lines+markers',
        name: 'Break Health'
    }

    var mufflerHealthTrace = {
        x: x,
        y: mufflerHealth,
        mode: 'lines+markers',
        name: 'Muffler Health'
    }

    var engineHealthTrace = {
        x: x,
        y: engineHealth,
        mode: 'lines+markers',
        name: 'Engine Health'
    }

    var tireHealthTrace = {
        x: x,
        y: tireHealth,
        mode: 'lines+markers',
        name: 'Tire Health'
    }

    var gearsHealthTrace = {
        x: x,
        y: gearsHealth,
        mode: 'lines+markers',
        name: 'Gear Health'
    }

    var batteryHealthTrace = {
        x: x,
        y: batteryHealth,
        mode: 'lines+markers',
        name: 'Battery Health'
    }

    var wearingPartsChart = JSON.stringify({
        data:
            [
                breaksHealthTrace, mufflerHealthTrace, engineHealthTrace, tireHealthTrace, gearsHealthTrace, batteryHealthTrace
            ],
        layout: {
            title: "Wearing parts analysis",
            labelX: "Wearing part",
            labelY: "Health Status in %"
        }
    });

    return wearingPartsChart;
}

module.exports = {
    Query: {
        fetchCars: async (_, { dataSources }) => {
            var request = {
                index: "car",
                body: { match_all: {} }
            }
            return await dataSources.elastic.fetchData(request);
        },
        fetchAnalyticResults: async (_, __, { dataSources }) => {
            var charts = []

            var request = {
                index: "car",
                body: { query: { match_all: {} } }
            }

            var requestWearingParts = {
                index: "total_wearing_parts_avg",
                body: { query: { match_all: {} } }
            }

            //var carData = await dataSources.elastic.fetchData(request);
            var wearingPartsAvg = await dataSources.elastic.fetchData(requestWearingParts);

            charts.push({
                title: "Wearing parts analysis",
                type: "bar",
                graph: getWearingParts(wearingPartsAvg)
            }
            );

            return charts;
        },


        fetchAnalyticResultsDriver: async (_, { id }, { dataSources }) => {

            var charts = []

            var requestCar = {
                index: "car",
                body: { query: { match: { id: id } } }
            }
            var requestCarMax = {
                index: "car_max",
                body: { query: { match: { id: id } } }
            }
            var requestCarAvg = {
                index: "car_avg",
                body: { query: { match: { id: id } } }
            }
            var requestCarWearingParts = {
                index: "car_wearing_parts_avg",
                body: { query: { match: { id: id } } }
            }
            var requestCarWaitingTime = {
                index: "waiting-time",
                body: { query: { match: { id: id } } }
            }

            var carData = await dataSources.elastic.fetchData(requestCar);
            var metricsMax = await dataSources.elastic.fetchData(requestCarMax);
            var metricsAvg = await dataSources.elastic.fetchData(requestCarAvg);
            var wearingPartsAvg = await dataSources.elastic.fetchData(requestCarWearingParts);
            var waitingTime = await dataSources.elastic.fetchData(requestCarWaitingTime);

            delete metricsMax[0].id
            delete metricsAvg[0].id
            delete wearingPartsAvg[0].id
            delete waitingTime[0].id
            
            delete metricsMax[0].max_rpm
            delete metricsAvg[0].avg_rpm

            var metricsMaxChart = JSON.stringify({
                data:
                    [{
                        x: Object.keys(metricsMax[0]),
                        y: Object.values(metricsMax[0]),
                        type: "bar"
                    }],
                layout: {
                    title: "Car metrics highest values",
                    labelX: "Category",
                    labelY: "Value"
                }
            });
            charts.push({
                title: "Car metrics highest values",
                type: "bar",
                graph: metricsMaxChart
            }
            )

            var metricsAvgChart = JSON.stringify({
                data:
                    [{
                        x: Object.keys(metricsAvg[0]),
                        y: Object.values(metricsAvg[0]),
                        type: "bar"
                    }],
                layout: {
                    title: "Car metrics average values",
                    labelX: "Category",
                    labelY: "Value"
                }
            });

            charts.push({
                title: "Car metrics average values",
                type: "bar",
                graph: metricsAvgChart
            }
            );

            var waitingTimeChart = JSON.stringify({
                data:
                    [{
                        lat: waitingTime.map(row => row.lat),
                        lon: waitingTime.map(row => row.lon),
                        text: waitingTime.map(row => "Waiting time (s): " + (row.waitingTime/60)),
                        type: "scattergeo",
                        mode: "markers"
                    }],
                layout: {
                    title: "Drive Analysis: Waiting time",
                    geo_scope:'europe'
                }
            });

            charts.push({
                title: "Drive Analysis: Waiting time",
                type: "scattergeo",
                graph: waitingTimeChart
            }
            );

            var driveChart = JSON.stringify({
                data:
                    [{
                        lat: carData.map(row => row.lat),
                        lon: carData.map(row => row.lon),
                        text: waitingTime.map(row => "Date: " + row.year + "-" + row.month + "-" + row.day),
                        type: "scattergeo"
                    }],
                layout: {
                    title: "Drive Analysis: Routes",
                    geo_scope:'europe'
                }
            });

            charts.push({
                title: "Drive Analysis: Waiting time",
                type: "scattergeo",
                graph: driveChart
            }
            );

            charts.push({
                title: "Wearing parts analysis",
                type: "bar",
                graph: getWearingParts(wearingPartsAvg)
            }
            );

            return charts;
        }
    }
}