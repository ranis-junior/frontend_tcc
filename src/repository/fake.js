function generateDateArray(startDate, endDate) {
    const dates = [];

    while (startDate < endDate) {
        startDate.setSeconds(startDate.getSeconds() + 1);
        let date = new Date(startDate.getTime());
        dates.push(date);
    }

    return dates;
}


async function loadMeasurements(deviceId, startDate, endDate) {

    let voltageLoad = 10
    let currentLoad = 0.5

    let randomVoltageNoise = Math.random() * 3.5
    let randomCurrentNoise = Math.random()

    let series = []

    let dates = generateDateArray(startDate, endDate);

    for (let date of dates) {
        series.push({
            date,
            voltage: voltageLoad + randomVoltageNoise,
            current: currentLoad + randomCurrentNoise
        })
        randomVoltageNoise = Math.random() * 3.5
        randomCurrentNoise = Math.random()
    }

    return series
}

export {
    loadMeasurements,
}