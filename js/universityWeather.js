import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchUniversitiesList } from "./fetchUniversitiesList.js";

export function fetchUniversityWeather(universityQuery, transformName) {
    return fetchUniversitiesList(universityQuery)
        .then(searchNames => {
        if (searchNames.length === 0) {
            throw new Error("No results found for query.");
        }
        return Promise.all(searchNames.map(university => {
            const newName = transformName !== undefined ? transformName(university) : university;
            return fetchGeoCoord(newName)
                .then(coords => fetchCurrentTemperature(coords))
                .then(temps => {
                const temp = temps.temperature_2m.reduce((acc, e) => (acc += e), 0) / temps.temperature_2m.length;
                return { name: newName, avgTemp: temp };
            });
        }));
    })
        .then(averages => {
        const totalAvg = averages.map(obj => obj.avgTemp).reduce((acc, e) => (acc += e), 0) / averages.length;
        const obj = { totalAverage: totalAvg };
        averages.forEach(avg => {
            const key = avg.name;
            obj[key] = avg.avgTemp;
        });
        return obj;
    })
        .catch(err => Promise.reject(err));
}
export function transform(string) {
    let newStr = string;
    if (string.includes(" at ")) {
        newStr = string.replace(" at ", " ");
    }
    return newStr;
}