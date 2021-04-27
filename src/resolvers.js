const sort = [
    { "year": { "order": "desc" } },
    { "month": { "order": "desc" } },
    { "day": { "order": "desc" } }
]

const getYearMonthDayFormat = function (rows) {
    return rows.map(row => row.year + "-" + row.month + "-" + row.day)
}

const getWearingParts = function (wearingParts) {
    var x = [];
    var breaksHealth = [];
    var mufflerHealth = [];
    var engineHealth = [];
    var tireHealth = [];
    var gearsHealth = [];
    var batteryHealth = [];

    for (row of wearingParts) {
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


const getWearingPartsDecrease = function (wearingParts) {
    var x = [];
    var breaksHealthDecrease = [];
    var mufflerHealthDecrease = [];
    var engineHealthDecrease = [];
    var tireHealthDecrease = [];
    var gearsHealthDecrease = [];
    var batteryHealthDecrease = [];

    for (row of wearingParts) {
        x.push(row.year + "-" + row.month + "-" + row.day);
        breaksHealthDecrease.push(row["avg(breaksHealthDecrease)"]);
        mufflerHealthDecrease.push(row["avg(mufflerHealthDecrease)"]);
        engineHealthDecrease.push(row["avg(engineHealthDecrease)"]);
        tireHealthDecrease.push(row["avg(tireHealthDecrease)"]);
        gearsHealthDecrease.push(row["avg(gearsHealthDecrease)"]);
        batteryHealthDecrease.push(row["avg(batteryHealthDecrease)"]);
    }

    var breaksHealthDecreaseTrace = {
        x: x,
        y: breaksHealthDecrease,
        mode: 'lines+markers',
        name: 'Break Health'
    }

    var mufflerHealthDecreaseTrace = {
        x: x,
        y: mufflerHealthDecrease,
        mode: 'lines+markers',
        name: 'Muffler Health'
    }

    var engineHealthDecreaseTrace = {
        x: x,
        y: engineHealthDecrease,
        mode: 'lines+markers',
        name: 'Engine Health'
    }

    var tireHealthDecreaseTrace = {
        x: x,
        y: tireHealthDecrease,
        mode: 'lines+markers',
        name: 'Tire Health'
    }

    var gearsHealthDecreaseTrace = {
        x: x,
        y: gearsHealthDecrease,
        mode: 'lines+markers',
        name: 'Gear Health'
    }

    var batteryHealthDecreaseTrace = {
        x: x,
        y: batteryHealthDecrease,
        mode: 'lines+markers',
        name: 'Battery Health'
    }

    var wearingPartsChart = JSON.stringify({
        data:
            [
                breaksHealthDecreaseTrace, mufflerHealthDecreaseTrace, engineHealthDecreaseTrace, tireHealthDecreaseTrace, gearsHealthDecreaseTrace, batteryHealthDecreaseTrace
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
        fetchCars: async (_, { id }, { dataSources }) => {
            var request = {
                index: "car",
                body: { query: { match: { id: id } } }
            }
            return await dataSources.elastic.fetchData(request);
        },
        fetchAnalyticResults: async (_, __, { dataSources }) => {
            var charts = []

            var requestWearingParts = {
                index: "wearing-parts-decrease",
                body: { query: { match_all: {} }, sort }
            }

            var wearingPartsDecrease = await dataSources.elastic.fetchData(requestWearingParts);

            charts.push({
                title: "Wearing parts analysis",
                chartType: "bar",
                graph: getWearingPartsDecrease(wearingPartsDecrease)
            }
            );

            return charts;
        },


        fetchAnalyticResultsDriver: async (_, { id }, { dataSources }) => {

            var charts = []

            var requestCarPos = {
                index: "car-pos",
                size: 10000,
                body: { query: { match: { id: id } } }
            }
            var requestCarAvg = {
                index: "car-avg",
                body: { query: { match: { id: id } }, sort: sort },

            }
            var requestCarWearingParts = {
                index: "wearing-parts-car",
                body: { query: { match: { id: id } }, sort: sort }
            }
            var requestCarWaitingTime = {
                index: "waiting-time",
                size: 10000,
                body: { query: { match: { id: id } } }
            }
            var requestCarBreaking = {
                index: "car-breaking",
                body: { query: { match: { id: id } }, sort: sort }
            }

            var pos = await dataSources.elastic.fetchData(requestCarPos);
            var metricsAvg = await dataSources.elastic.fetchData(requestCarAvg);
            var wearingParts = await dataSources.elastic.fetchData(requestCarWearingParts);
            var waitingTime = await dataSources.elastic.fetchData(requestCarWaitingTime);
            var breaking = await dataSources.elastic.fetchData(requestCarBreaking);

            var metricsAverageConsumptionChart = JSON.stringify({
                data:
                    [{
                        x: getYearMonthDayFormat(metricsAvg),
                        y: metricsAvg.map(row => row.consumptionKm),
                        type: "line"
                    }],
                layout: {
                    title: "Average fuel consumption",
                    labelX: "",
                    labelY: "l/KM"
                }
            });
            charts.push({
                title: "Average fuel consumption",
                chartType: "line",
                graph: metricsAverageConsumptionChart
            }
            )

            var metricsAverageRPMChart = JSON.stringify({
                data:
                    [{
                        x: getYearMonthDayFormat(metricsAvg),
                        y: metricsAvg.map(row => row.rpm),
                        type: "line"
                    }],
                layout: {
                    title: "Average RPM values",
                    labelX: "",
                    labelY: "line"
                }
            });
            charts.push({
                title: "Average RPM values",
                chartType: "line",
                graph: metricsAverageRPMChart
            }
            )


            var breakingChart = JSON.stringify({
                data:
                    [{
                        x: getYearMonthDayFormat(breaking),
                        y: breaking.map(row => row.count),
                        type: "line"
                    }],
                layout: {
                    title: "Breaking behaviour",
                    labelX: "",
                    labelY: "Break used"
                }
            });
            charts.push({
                title: "Breaking behaviour",
                chartType: "line",
                graph: breakingChart
            }
            )

            var centerPosWaitingTimeLat = waitingTime[parseInt(waitingTime.length / 2)].lat
            var centerPosWaitingTimeLon = waitingTime[parseInt(waitingTime.length / 2)].lon

            var dates = {}
            for (row of waitingTime) {
                var date = (row.year + "-" + row.month + "-" + row.day);

                if (date in dates) {
                    dates[date].push(row);
                } else {
                    dates[date] = []
                }
            }

            var waitingTimeChartData = [];
            for (const [key, rows] of Object.entries(dates)) {
                waitingTimeChartData.push({
                    lat: rows.map(row => row.lat),
                    lon: rows.map(row => row.lon),
                    text: rows.map(row => "Waiting time (s): " + parseInt(row.waitingTime / 1000)),
                    type: "scattermapbox",
                    mode: "markers",
                    name: key
                });

            }

            var waitingTimeChart = JSON.stringify({
                data: waitingTimeChartData,
                layout: {
                    title: "Drive Analysis: Standing time",
                    mapbox_style: "open-street-map",
                    geo_scope: 'europe',
                    mapbox: {
                        bearing: 0,
                        center: {
                            lat: centerPosWaitingTimeLat,
                            lon: centerPosWaitingTimeLon
                        },
                        pitch: 0,
                        zoom: 2
                    }
                }
            });
            charts.push({
                title: "Drive Analysis: Standing time",
                chartType: "map",
                graph: waitingTimeChart
            }
            );

            var centerPosDriveLat = pos[parseInt(pos.length / 2)].lat
            var centerPosDriveLon = pos[parseInt(pos.length / 2)].lon

            var dates = {}
            for (row of pos) {
                var date = (row.year + "-" + row.month + "-" + row.day);

                if (date in dates) {
                    dates[date].push(row);
                } else {
                    dates[date] = []
                }
            }

            var driveChartData = [];
            for (const [key, rows] of Object.entries(dates)) {
                driveChartData.push({
                    lat: rows.map(row => row.lat),
                    lon: rows.map(row => row.lon),
                    text: rows.map(row => "Date: " + key),
                    type: "scattermapbox",
                    mode: "lines",
                    name: key
                });

            }

            var driveChart = JSON.stringify({
                data: driveChartData,
                layout: {
                    title: "Drive Analysis: Routes",
                    geo_scope: 'europe',
                    mapbox_style: "open-street-map",
                    mapbox: {
                        bearing: 0,
                        center: {
                            lat: centerPosDriveLat,
                            lon: centerPosDriveLon
                        },
                        pitch: 0,
                        zoom: 2
                    }
                }
            });

            charts.push({
                title: "Drive Analysis: Routes",
                chartType: "map",
                graph: driveChart
            }
            );

            charts.push({
                title: "Wearing parts analysis",
                chartType: "bar",
                graph: getWearingParts(wearingParts)
            }
            );

            return charts;
        }
    }
}