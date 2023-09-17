import assert from "assert";
import { fetchUniversitiesList } from "./fetchUniversitiesList.js";

describe("fetchUniversities", () => {
  it("follows type specification", () => {
    const promise = fetchUniversitiesList("University of Massachusetts at Amherst");

    return promise.then((result) => {
      assert(Array.isArray(result), "Result should be an array");
      assert(result.every((x) => typeof x === "string"), "All elements should be strings");
    });
  });

  it("returns the proper university", () => {
    const promise = fetchUniversitiesList("University of Massachusetts at Amherst");

    return promise.then((result) => {
      assert(Array.isArray(result), "Result should be an array");
      assert(result.length > 0, "At least one university should be found");
      assert(result.includes("University of Massachusetts at Amherst"), "Expected university not found in the result");
    });
  });

  it("returns no university for non-existent university", () => {
    const promise = fetchUniversitiesList("Dumb College");

    return promise.then((result) => {
      assert(Array.isArray(result), "Result should be an array");
      assert(result.length === 0, "No universities should be found for non-existent university");
    });
  });

  it("returns universities for an empty query", () => {
    const promise = fetchUniversitiesList("");

    return promise.then((result) => {
      assert(Array.isArray(result), "Result should be an array");
      assert(result.length > 0, "At least one university should be found");
    });
  });
});
