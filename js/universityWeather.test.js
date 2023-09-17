import assert from "assert";
import { fetchUCalWeather, fetchUMassWeather, fetchUniversityWeather, transform } from "./fetchUniversityWeather.js";
describe("fetchUCalWeather", () => {
    it("follows type specification", () => {
        const promise = fetchUCalWeather();
        return promise.then(result => {
            assert(typeof result === "object");
            assert(Object.keys(result).every(x => typeof x === "string"));
            assert(Object.values(result).every(x => typeof x === "number"));
        });
    });
});
describe("fetchUMassWeather", () => {
    it("follows type specification", () => {
        const promise = fetchUMassWeather();
        return promise.then(result => {
            assert(typeof result === "object");
            assert(Object.keys(result).every(x => typeof x === "string"));
            assert(Object.values(result).every(x => typeof x === "number"));
        });
    });
});
describe("fetchUniversityWeather", () => {
    it("follows type specification for UMass", () => {
        const promise = fetchUniversityWeather("University of Massachusetts", transform);
        return promise.then(result => {
            assert(typeof result === "object");
            assert(Object.keys(result).every(x => typeof x === "string"));
            assert(Object.values(result).every(x => typeof x === "number"));
        });
    });
    it("follows type specification for UCal", () => {
        const promise = fetchUniversityWeather("University of California");
        return promise.then(result => {
            assert(typeof result === "object");
            assert(Object.keys(result).every(x => typeof x === "string"));
            assert(Object.values(result).every(x => typeof x === "number"));
        });
    });
    it("should reject for invalid query", async () => {
        await expect(fetchUniversityWeather("Dumb College")).rejects.toThrow("No results found for query.");
    });
});
describe("transform", () => {
    it("returns proper string", () => {
        const string = transform("University of Massachusetts at Amherst");
        assert(string === "University of Massachusetts Amherst");
    });
    it("returns proper string with no at", () => {
        const string = transform("University of Massachusetts Boston");
        assert(string === "University of Massachusetts Boston");
    });
});
//# sourceMappingURL=universityWeather.test.js.map