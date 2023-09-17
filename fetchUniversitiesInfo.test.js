import assert from "assert";
import { fetchUniversitiesInfo } from "./fetchUniversitiesInfo.js";

describe("fetchUniversitiesInfo", () => {
  it("follows type specification", () => {
    const promise = fetchUniversitiesInfo("University of Massachusetts at Amherst");

    return promise.then((result) => {
      assert(typeof result === "object", "Result should be an object");
      Object.keys(result).forEach((country) => {
        assert(Array.isArray(result[country]), "Universities for each country should be an array");
        assert(result[country].every((university) => typeof university === "object"), "All university entries should be objects");
        assert(result[country].every((university) => university.name && university.urls), "All universities should have a name and urls property");
      });
    });
  });

  it("returns universities for a valid query", () => {
    const promise = fetchUniversitiesInfo("University of Massachusetts at Amherst");

    return promise.then((result) => {
      assert(typeof result === "object", "Result should be an object");
      assert(Object.keys(result).length > 0, "At least one country should have universities");
      Object.keys(result).forEach((country) => {
        assert(result[country].length > 0, "At least one university should be found for each country");
      });
    });
  });

  it("returns no universities for a non-existent university", () => {
    const promise = fetchUniversitiesInfo("Fake College");

    return promise.then((result) => {
      assert(typeof result === "object", "Result should be an object");
      assert(Object.keys(result).length === 0, "No universities should be found for a non-existent university");
    });
  });

  it("returns universities for an empty query", () => {
    const promise = fetchUniversitiesInfo("");

    return promise.then((result) => {
      assert(typeof result === "object", "Result should be an object");
      assert(Object.keys(result).length > 0, "At least one country should have universities");
      Object.keys(result).forEach((country) => {
        assert(result[country].length > 0, "At least one university should be found for each country");
      });
    });
  });
});
