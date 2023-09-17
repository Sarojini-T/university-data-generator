//This function will be used to provide the user with a list of countries to select 
export async function fetchCountries() {
    try {
        const response = await fetch("http://universities.hipolabs.com/search?country");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const universities = await response.json();
        
        // Check if universities is an array of objects
        if (Array.isArray(universities) && universities.length > 0 && universities[0].country) {
            //Create a set to store countries without duplicates
            const countries = [...new Set(universities.map((university) => university.country))];
            return countries;
        } else {
            throw new Error("Invalid data format received from the API");
        }
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}
