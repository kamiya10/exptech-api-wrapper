const fetch = require("node-fetch").default;

const baseurl = "https://exptech.com.tw";

class V1Data {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

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
  async getEarthquakeReports(limit = 50) {
    if (!Number.isInteger(limit)) throw new TypeError(`"${limit}" is not a integer`);
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        APIkey   : "https://github.com/ExpTechTW",
        Function : "data",
        Type     : "earthquake",
        Value    : limit,
      }),
    });
    const data = await response.json();
    return data.response;
  }

  async getRadarURL() {
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        APIkey   : "https://github.com/ExpTechTW",
        Function : "data",
        Type     : "radar",
      }),
    });
    const data = await response.json();
    return `https://exptech.com.tw/get?Function=File&Path=${data.response}`;
  }

  async getSatelliteURL() {
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        APIkey   : "https://github.com/ExpTechTW",
        Function : "data",
        Type     : "satellite",
      }),
    });
    const data = await response.json();
    return `https://exptech.com.tw/get?Function=File&Path=${data.response}`;
  }

  async getAccumulationURL() {
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        APIkey   : "https://github.com/ExpTechTW",
        Function : "data",
        Type     : "accumulation",
      }),
    });
    const data = await response.json();
    return `https://exptech.com.tw/get?Function=File&Path=${data.response}`;
  }

  async getPrecipitationForecastURL() {
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        APIkey   : "https://github.com/ExpTechTW",
        Function : "data",
        Type     : "PrecipitationForecast",
      }),
    });
    const data = await response.json();
    return `https://exptech.com.tw/get?Function=File&Path=${data.response}`;
  }

  /**
   * Gets realtime data from TREM stations.
   * @param {number} time
   * @returns {Promise<object>}
   */
  async getRealtimeStationData(time = 0) {
    if (!Number.isInteger(time)) throw new TypeError(`"${time}" is not a integer`);
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        APIkey   : "https://github.com/ExpTechTW",
        Function : "data",
        Type     : "TREM",
        Value    : time,
      }),
    });
    const data = await response.json();
    return data.response;
  }

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
  async getEEW(provider = "earthquake") {
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        APIkey   : "https://github.com/ExpTechTW",
        Function : "data",
        Type     : "EEW-v1",
        Value    : provider,
      }),
    });
    const data = await response.json();
    return data.response;
  }

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
  async getPAlertData() {
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        APIkey   : "https://github.com/ExpTechTW",
        Function : "data",
        Type     : "palert",
      }),
    });
    const data = await response.json();
    return data.response;
  }
}

/**
 * The v1 ExpTech API wrapper
 */
class V1 {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.data = new V1Data(apiKey);
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
    const response = await fetch(baseurl + "/get" + "?Function=NTP");
    const data = await response.json();
    return data;
  }

  /**
   * Check url safety
   * @param {string} url The url to check
   * @returns {Promise<boolean>}
   */
  async isURLSafe(url) {
    if (typeof url != "string") throw new TypeError(`"${url}" is not a string`);
    if (!url.match(/^https?:\/\/.+/)) throw new TypeError(`"${url}" is not a valid URL`);
    const response = await fetch(baseurl + "/post", {
      method  : "POST",
      headers : { "content-type": "application/json" },
      body    : JSON.stringify({
        Function      : "et",
        Type          : "urlChecker",
        Value         : url,
        FormatVersion : 2,
        Addition      : {
          FuzzyMatch: true,
        },
      }),
    });
    const data = await response.json();
    if (data.state === "Success")
      if (data.response === "All URL inspections passed")
        return true;
      else
        return false;
    else
      throw new Error(data.response);
  }
}

class ExpTech {
  /**
   * @param {string} [apiKey="https://github.com/ExpTechTW"] The api key to uuse
   */
  constructor(apiKey) {
    this.apiKey = apiKey ?? "https://github.com/ExpTechTW";
    this.v1 = new V1(apiKey);
  }
}

module.exports = ExpTech;