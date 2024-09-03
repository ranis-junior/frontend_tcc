import {fetchAndJSON} from "@/utils.js";


async function loadMeasurements(deviceId, startDate, endDate) {

    const url = new URL('https://cf81-2804-d59-8141-b500-627c-13f5-7b3d-2193.ngrok-free.app/leituras/300')

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