//This function takes in coordinates and return the current temperature
export function fetchCurrentTemperature(coords) {
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" +
        coords.lat.toString() +
        "&longitude=" +
        coords.lon.toString() +
        "&hourly=temperature_2m&temperature_unit=fahrenheit";

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(json => {
            return { time: json.hourly.time, temperature_2m: json.hourly.temperature_2m };
        })
        .catch(error => {
            console.error("Error fetching current temperature:", error);
            throw error;
        });
}
