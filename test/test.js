/* eslint-disable max-nested-callbacks */
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

const { ExptechAPI } = require("../index");

describe("ExptechAPI", function() {
  const api = new ExptechAPI();

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
        it("should return a report with report number 111111", async function() {
          const data = await api.v1.earthquake.getReportByNumber(111111);
          data.should.have.property("No", "111111");
        });
        it("should throw error when report number is not an integer", async function() {
          (async () => await api.v1.earthquake.getReports(2.3))().should.eventually.throw(TypeError);
        });
      });
    });
  });
});