// This function returns a hashmap with countries as keys and a university objects as a values
export function fetchUniversitiesInfo(query) {
  const jsonURL = new URL("http://universities.hipolabs.com/search");
  jsonURL.searchParams.append("name", query);
  const newURL = jsonURL.toString();

  return fetch(newURL)
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then((universitiesData) => {
          if (Array.isArray(universitiesData)) {
              const universitiesByCountry = {};

              universitiesData.forEach((university) => {
                  const { name, country, web_pages } = university;
                  if (country && name && web_pages) {
                      if (!universitiesByCountry[country]) {
                          universitiesByCountry[country] = [{name:name, urls: web_pages.map((webpage) => webpage)}];
                      }
                      universitiesByCountry[country].push({
                          name: name,
                          urls: web_pages.map((webpage) => webpage) || [], 
                      });
                  }
              });

              return universitiesByCountry;
          } else {
              return {};
          }
      });
}
