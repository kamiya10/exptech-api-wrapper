/* eslint-disable max-nested-callbacks */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const ExpTech = require("../index").default;

describe("ExpTech", function() {
  const api = new ExpTech();
  describe("v0", function() {
    describe("getAPITime()", function() {
      it("should return an object contains \"Value\" and \"Full\"", async function() {
        const data = await api.v0.getAPITimestamp();
        return data.should.have.keys("Value", "Full");
      });
    });

    describe("isURLSafe()", function() {
      it("should return true if url is safe", async function() {
        const data = await api.v0.isURLSafe("https://google.com");
        return data.should.be.true;
      });
      // no available unsafe url examples, skipped
      it.skip("should return false if url is unsafe", async function() {
        const data = await api.v0.isURLSafe();
        return data.should.be.false;
      });
      it("should throw error when URL is not provided", async function() {
        (async () => await api.v0.isURLSafe())().should.eventually.throw(TypeError);
      });
      it("should throw error when the provided URL is not a valid URL", async function() {
        (async () => await api.v0.isURLSafe("foobar"))().should.eventually.throw(Error);
      });
    });

    describe("data", function() {
      describe("getEarthquakeReports()", function() {
        it("should return latest 50 reports when limit isn't specified", async function() {
          const data = await api.v0.data.getEarthquakeReports();
          data.should.length(50);
        });
        it("should return latest 10 reports when limit is 10", async function() {
          const data = await api.v0.data.getEarthquakeReports(10);
          data.should.length(10);
        });
        it("should return latest 250 reports when limit is 500", async function() {
          const data = await api.v0.data.getEarthquakeReports(500);
          data.should.length(250);
        });
        it("should throw error when limit is not an integer", async function() {
          (async () => await api.v0.data.getEarthquakeReports(2.3))().should.eventually.throw(TypeError);
        });
      });

      describe("getRadarURL()", function() {
        it("should return a url", async function() {
          const data = await api.v0.data.getRadarURL();
          data.should.match(/^https:\/\/exptech.com\.tw\/get\?Function=File&Path=\/Download\/\d+.png$/);
        });
      });

      describe("getSatelliteURL()", function() {
        it("should return a url", async function() {
          const data = await api.v0.data.getSatelliteURL();
          data.should.match(/^https:\/\/exptech.com\.tw\/get\?Function=File&Path=\/Download\/\d+.png$/);
        });
      });

      describe("getAccumulationURL()", function() {
        it("should return a url", async function() {
          const data = await api.v0.data.getAccumulationURL();
          data.should.match(/^https:\/\/exptech.com\.tw\/get\?Function=File&Path=\/Download\/\d+.png$/);
        });
      });

      describe("getPrecipitationForecastURL()", function() {
        it("should return a url", async function() {
          const data = await api.v0.data.getPrecipitationForecastURL();
          data.should.match(/^https:\/\/exptech.com\.tw\/get\?Function=File&Path=\/Download\/\d+.png$/);
        });
      });

      describe("getRealtimeStationData()", function() {
        it("should return a object", async function() {
          const data = await api.v0.data.getRealtimeStationData();
          data.should.not.be.undefined;
        });
        it("should throw error when time is not an integer", async function() {
          (async () => await api.v0.data.getRealtimeStationData(2.3))().should.eventually.throw(TypeError);
        });
      });

      describe("getEEW()", function() {
        it("should return a object", async function() {
          const data = await api.v0.data.getEEW();
          data.should.not.be.undefined;
        });
      });

      describe("getPAlertData()", function() {
        it("should return a object", async function() {
          const data = await api.v0.data.getPAlertData();
          data.should.not.be.undefined;
        });
      });
    });
  });

  describe("v1", function() {
    describe("earthquake", function() {
      describe("getReports()", function() {
        it("should return latest 15 reports when limit isn't specified", async function() {
          const data = await api.v1.earthquake.getReports();
          data.should.length(15);
        });
        it("should return latest 10 reports when limit is 10", async function() {
          const data = await api.v1.earthquake.getReports(10);
          data.should.length(10);
        });
        it("should return latest 250 reports when limit is 500", async function() {
          const data = await api.v1.earthquake.getReports(500);
          data.should.length(250);
        });
        it("should throw error when limit is not an integer", async function() {
          (async () => await api.v1.earthquake.getReports(2.3))().should.eventually.throw(TypeError);
        });
      });

      describe("getReportByNumber()", function() {
        it("should return a report with number 111111", async function() {
          const data = await api.v1.earthquake.getReportByNumber(111111);
          data.should.length(15);
        });
        it("should throw error when report number is not an integer", async function() {
          (async () => await api.v1.earthquake.getReports(2.3))().should.eventually.throw(TypeError);
        });
      });
    });
  });
});