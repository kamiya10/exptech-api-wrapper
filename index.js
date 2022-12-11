const fetch = require("node-fetch").default;

/**
 * Api request maker
 * @class RequestMaker
 */
class RequestMaker {
  constructor(apiKey, apiVersion = 1) {
    this.apiKey = apiKey ?? "https://github.com/ExpTechTW";
    switch (apiVersion) {
      case 0:
        this.baseurl = "https://exptech.com.tw";
        break;

      default:
        this.baseurl = `https://exptech.com.tw/api/v${apiVersion}`;
        break;
    }
  }

  async get(endpoint, parms = {}) {
    const response = await fetch(`${this.baseurl + endpoint}?${new URLSearchParams({ ...parms })}`, {
      method: "GET",
    });

    if (!response.ok)
      throw new Error(`The server responded with status code ${response.status}`);
    else if (response.status == 200)
      return response.json();

    return true;
  }

  async post(endpoint, body = {}) {
    const response = await fetch(this.baseurl + endpoint, {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        apiKey: this.apiKey,
        ...body,
      }),
    });

    if (!response.ok)
      throw new Error(`The server responded with status code ${response.status}`);
    else if (response.status == 200)
      return response.json();

    return true;
  }
}

/**
 * The v1 api
 * @class V1
 * @extends RequestMaker
 */
class V1 extends RequestMaker {
  constructor(apiKey) {
    super(apiKey, 1);
    this.earthquake = {
      /**
        * @typedef {object} EarthquakeReport
        * @property {string} identifier
        * @property {number} earthquakeNo
        * @property {number} epicenterLon
        * @property {number} epicenterLat
        * @property {string} location
        * @property {number} depth
        * @property {number} magnitudeValue
        * @property {string} originTime
        * @property {data[]} data
        * @property {number[]} ID
        */

      /**
        * @typedef {object} data
        * @property {string} areaName
        * @property {number} areaIntensity
        * @property {eqStation[]} eqStation
        */

      /**
        * @typedef {object} eqStation
        * @property {string} stationName
        * @property {number} stationLon
        * @property {number} stationLat
        * @property {number} distance
        * @property {number} stationIntensity
        */

      /**
       * Fetch earthquake reports.
       * @param {number} [limit = 15] How many reports should be fetched.
       * @returns {Promise<EarthquakeReport[]>}
       * @example
       * // Fetch 10 reports
       * // will return a DetailedEarthquakeReport[]
       * const reports = await ExptechAPI.v1.earthquake.getReports(10);
       */
      getReports: async (limit = 15) => {
        return await this.get("/earthquake/reports", {
          limit,
        });
      },

      /**
        * @typedef {object} DetailedEarthquakeReport
        * @property {"report"} Function
        * @property {number} Time
        * @property {string} EastLongitude
        * @property {string} NorthLatitude
        * @property {string} Depth
        * @property {string} Scale
        * @property {string} `UTC\+8`
        * @property {string} Location
        * @property {string} Max
        * @property {string} EventImage
        * @property {string} ShakeImage
        * @property {string} Web
        * @property {string} No
        * @property {number} TimeStamp
        * @property {Intensity[]} Intensity
        */

      /**
        * @typedef {object} Intensity
        * @property {string} areaDesc
        * @property {areaMaxIntensity} areaMaxIntensity
        * @property {station} station
        */

      /**
        * @typedef {object} areaMaxIntensity
        * @property {string} unit
        * @property {string} $t
        */

      /**
        * @typedef {object} station
        * @property {string} stationName
        * @property {string} stationCode
        * @property {stationLon} stationLon
        * @property {stationLat} stationLat
        * @property {distance} distance
        * @property {azimuth} azimuth
        * @property {stationIntensity} stationIntensity
        * @property {pga} pga
        * @property {string} waveImageURI
        */

      /**
        * @typedef {object} stationLon
        * @property {string} unit
        * @property {string} $t
        */

      /**
        * @typedef {object} stationLat
        * @property {string} unit
        * @property {string} $t
        */

      /**
        * @typedef {object} distance
        * @property {string} unit
        * @property {string} $t
        */

      /**
        * @typedef {object} azimuth
        * @property {string} unit
        * @property {string} $t
        */

      /**
        * @typedef {object} stationIntensity
        * @property {string} unit
        * @property {string} $t
        */

      /**
        * @typedef {object} pga
        * @property {string} unit
        * @property {string} vComponent
        * @property {string} nsComponent
        * @property {string} ewComponent
        */

      /**
       * Fetch a specific earthquake report by its number.
       * @param {number} earthquakeNo The report number to fetch.
       * @returns {Promise<DetailedEarthquakeReport>}
       * @example
       * // Fetch the report numbered 111127
       * // will return a DetailedEarthquakeReport
       * const report = await ExptechAPI.v1.earthquake.getReportByNumber(111127);
       */
      getReportByNumber: async (earthquakeNo) => {
        if (!Number.isInteger(earthquakeNo)) throw new TypeError(`"${earthquakeNo}" is not a integer`);
        return await this.get(`/earthquake/reports/${earthquakeNo}`);
      },
    };
  }
}

class ExptechAPI {
  /**
   * @param {string} [apiKey="https://github.com/ExpTechTW"] The api key to uuse
   */
  constructor(apiKey) {
    /**
     * @type {V1} The v1 api.
     */
    this.v1 = new V1(apiKey);
  }
}

module.exports = { ExptechAPI };