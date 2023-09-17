//This function returns an array of universities
export function fetchUniversitiesList(query) {
    const jsonURL = new URL("http://universities.hipolabs.com/search");
    jsonURL.searchParams.append("name", query);
    const newURL = jsonURL.toString();
    const empty = [];
    
    return fetch(newURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(json => (json.length > 0 && Array.isArray(json) ? json.map(x => x.name) : empty))
        .catch(error => {
            console.error("Error fetching universities:", error);
            return empty;
        });
}
