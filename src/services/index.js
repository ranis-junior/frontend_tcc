import {loadMeasurements} from "@/repository/database.js";

const dataService = {loadMeasurements}

async function loadMeasurementsByDate(deviceId, initialDate, finalDate) {
    if (deviceId === null || initialDate === null || finalDate === null) {
        throw new Error("All parameters should be provided");
    }
    return dataService.loadMeasurements(deviceId, initialDate, finalDate);
}


export {
    loadMeasurementsByDate
}