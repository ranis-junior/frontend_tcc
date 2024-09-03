import {fetchAndJSON} from "@/utils.js";


async function loadMeasurements(deviceId, startDate, endDate) {

    const url = new URL('http://localhost:8000/leituras/300')

    let readings = await fetchAndJSON(url)
    let data = []
    for (let read of readings) {
        data.push({
            date: read.horario_leitura,
            voltage: read.tensao,
            current: read.corrente
        })
    }

    return data
}


export {
    loadMeasurements,
}