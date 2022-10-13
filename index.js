const fetch = require("node-fetch").default;

class Request {
  constructor(apiKey, apiVersion) {
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

    return response.json();
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

    return response.json();
  }
}

/**
 * The v1 ExpTech API wrapper
 */
class V0 extends Request {
  constructor(apiKey) {
    super(apiKey, 0);
    this.data = {
      /**
       * Gets earthquake reports
       * @param {number} id
       * @returns {Promise<EarthquakeReport[]>}
       */
      getEarthquakeReport: async (id = 50) => {
        if (!Number.isInteger(id)) throw new TypeError(`"${id}" is not a integer`);
        const data = await this.post("/post", {
          Function : "data",
          Type     : "report",
          Value    : id,
        });
        return data.response;
      },

      /**
       * @typedef {object} EarthquakeReport
       * @property {string} identifier Report id
       * @property {number} earthquakeNo Report number
       * @property {number} epicenterLon Epicenter longitude
       * @property {number} epicenterLat Epicenter latitude
       * @property {string} location Epicenter location
       * @property {number} depth Earthquake depth
       * @property {number} magnitudeValue Earthquake magnitude
       * @property {string} originTime Earthquake time
       * @property {EarthquakeDetail[]} data
       * @property {[]} ID EEW ids
       */

      /**
       * @typedef {object} EarthquakeDetail
       * @property {string} areaName
       * @property {number} areaIntensity
       * @property {EarthquakeStation[]} eqStation
       */

      /**
       * @typedef {object} EarthquakeStation
       * @property {string} stationName
       * @property {number} stationLon
       * @property {number} stationLat
       * @property {number} distance
       * @property {number} stationIntensity
       */

      /**
       * Gets earthquake reports
       * @param {number} limit
       * @returns {Promise<EarthquakeReport[]>}
       */
      getEarthquakeReports: async (limit = 50) => {
        if (!Number.isInteger(limit)) throw new TypeError(`"${limit}" is not a integer`);
        const data = await this.post("/post", {
          Function : "data",
          Type     : "earthquake",
          Value    : limit,
        });
        return data.response;
      },

      getRadarURL: async () => {
        const data = await this.post("/post", {
          Function : "data",
          Type     : "radar",
        });
        return `https://exptech.com.tw/get?Function=File&Path=${data.response}`;
      },

      getSatelliteURL: async () => {
        const data = await this.post("/post", {
          Function : "data",
          Type     : "satellite",
        });
        return `https://exptech.com.tw/get?Function=File&Path=${data.response}`;
      },

      getAccumulationURL: async () => {
        const data = await this.post("/post", {
          Function : "data",
          Type     : "accumulation",
        });
        return `https://exptech.com.tw/get?Function=File&Path=${data.response}`;
      },

      getPrecipitationForecastURL: async () => {
        const data = await this.post("/post", {
          Function : "data",
          Type     : "PrecipitationForecast",
        });
        return `https://exptech.com.tw/get?Function=File&Path=${data.response}`;
      },

      /**
       * Gets realtime data from TREM stations.
       * @param {number} time
       * @returns {Promise<object>}
       */
      getRealtimeStationData: async (time = 0) => {
        if (!Number.isInteger(time)) throw new TypeError(`"${time}" is not a integer`);
        const data = await this.post("/post", {
          Function : "data",
          Type     : "TREM",
          Value    : time,
        });
        return data.response;
      },

      /**
       * @typedef {object} EEWData
       * @property {string} Function
       * @property {string} Type
       * @property {number} Time
       * @property {string} EastLongitude
       * @property {string} NorthLatitude
       * @property {number} Depth
       * @property {string} Scale
       * @property {number} FormatVersion
       * @property {number} TimeStamp
       * @property {string} UTC\u002b8
       * @property {number} Version
       * @property {string} APITimeStamp
       * @property {string} ID
       * @property {string} Location
       * @property {boolean} Cancel
       * @property {string} Unit
       * @property {boolean} Test
       */

      /**
       * Gets the latest EEW data.
       * @param {"JMA_earthquake" | "KMA_earthquake" | "NIED_earthquake" | "earthquake" | "FJDZJ_earthquake" | "ICL_earthquake"} provider Specify the EEW provider
       * @returns {Promise<EEWData>}
       */
      getEEW: async (provider = "earthquake") => {
        const data = await this.post("/post", {
          Function : "data",
          Type     : "EEW-v1",
          Value    : provider,
        });
        return data.response;
      },

      /**
       * @typedef {object} PAlertData
       * @property {string} Function
       * @property {number} TimeStamp
       * @property {number} FormatVersion
       * @property {PGAData} Data
       */

      /**
       * @typedef {object} PGAData
       * @property {Intensity[]} data
       * @property {string} time
       * @property {number} unix
       * @property {number} timestamp
       * @property {number} station
       * @property {boolean} final
       * @property {string} img
       */

      /**
       * @typedef {object} Intensity
       * @property {string} loc
       * @property {number} intensity
       */

      /**
       * Gets the latest realtime data
       * @returns {Promise<PAlertData>}
       */
      getPAlertData: async () => {
        const data = await this.post("/post", {
          Function : "data",
          Type     : "palert",
        });
        return data.response;
      } };
  }

  /**
   * @typedef {object} APITimestamp
   * @property {number} Value
   * @property {number} Full
   */

  /**
   * Gets the current API timestamp.
   * @returns {Promise<APITimestamp>}
   */
  async getAPITimestamp() {
    return await this.get("/get", { Function: "NTP" });
  }

  /**
   * Check url safety
   * @param {string} url The url to check
   * @returns {Promise<boolean>}
   */
  async isURLSafe(url) {
    if (typeof url != "string") throw new TypeError(`"${url}" is not a string`);
    if (!url.match(/^https?:\/\/.+/)) throw new TypeError(`"${url}" is not a valid URL`);
    const data = await this.post("/post", {
      Function      : "et",
      Type          : "urlChecker",
      Value         : url,
      FormatVersion : 2,
      Addition      : {
        FuzzyMatch: true,
      },
    });

    if (data.state === "Success")
      if (data.response === "All URL inspections passed")
        return true;
      else
        return false;
    else
      throw new Error(data.response);
  }
}

class V1 extends Request {
  constructor(apiKey) {
    super(apiKey, 1);
    this.earthquake = {
      getReports: async (limit = 15) => {
        return await this.get("/earthquake/reports", {
          limit,
        });
      },
      getReportByNumber: async (earthquakeNo) => {
        if (!Number.isInteger(earthquakeNo)) throw new TypeError(`"${earthquakeNo}" is not a integer`);
        return await this.get(`/earthquake/reports/${earthquakeNo}`);
      },
    };
  }
}

class ExpTech {
  /**
   * @param {string} [apiKey="https://github.com/ExpTechTW"] The api key to uuse
   */
  constructor(apiKey) {
    this.apiKey = apiKey ?? "https://github.com/ExpTechTW";
    this.v0 = new V0();
    this.v1 = new V1();
  }
}

module.exports.default = ExpTech;