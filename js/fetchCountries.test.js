import assert from "assert";
import { fetchCountries } from "./fetchCountries.js"; 

describe("fetchCountries", () => {
  it("returns an array of countries", () => {
    const promise = fetchCountries();

    return promise.then((result) => {
      assert(Array.isArray(result), "Result should be an array");
      assert(result.length > 0, "At least one country should be found");
      assert(result.every((country) => typeof country.name === "string"), "All elements should have a 'name' property of type string");
    });
  });

  it("follows type specification", () => {
    const promise = fetchCountries();

    return promise.then((result) => {
      assert(Array.isArray(result), "Result should be an array");
      assert(result.every((country) => typeof country.name === "string"), "All elements should have a 'name' property of type string");
    });
  });
});
