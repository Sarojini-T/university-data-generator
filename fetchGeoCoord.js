//This function takes in the name of a location and returns its longitude and latitude
export function fetchGeoCoord(query) {
    const jsonURL = new URL("https://geocode.maps.co/search");
    jsonURL.searchParams.append("q", query);

    return fetch(jsonURL.toString())
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(results => {
            if (results.length === 0) {
                throw new Error("No results found for query.");
            }
            
            const filteredResults = results.filter(n => "lon" in n && "lat" in n);
            if (filteredResults.length === 0) {
                throw new Error("No results with coordinates found for query.");
            }

            return {
                lat: Number.parseFloat(filteredResults[0].lat),
                lon: Number.parseFloat(filteredResults[0].lon)
            };
        })
        .catch(error => {
            console.error("Error fetching geo coordinates:", error);
            throw error;
        });
}
