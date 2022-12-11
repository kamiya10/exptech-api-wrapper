
type EarthquakeReport = {
  identifier: string;
  earthquakeNo: number;
  epicenterLon: number;
  epicenterLat: number;
  location: string;
  depth: number;
  magnitudeValue: number;
  originTime: string;
  data: data[];
  ID: number[];
};

type data = {
  areaName: string;
  areaIntensity: number;
  eqStation: eqStation[];
};

type eqStation = {
  stationName: string;
  stationLon: number;
  stationLat: number;
  distance: number;
  stationIntensity: number;
};

type DetailedEarthquakeReport = {
  Function: "report";
  Time: number;
  EastLongitude: string;
  NorthLatitude: string;
  Depth: string;
  Scale: string;
  "UTC+8": string;
  Location: string;
  Max: string;
  EventImage: string;
  ShakeImage: string;
  Web: string;
  No: string;
  TimeStamp: number;
  Intensity: Intensity[];
};

type Intensity = {
  areaDesc: string;
  areaMaxIntensity: areaMaxIntensity;
  station: station;
};

type areaMaxIntensity = {
  unit: string;
  $t: string;
};

type station = {
  stationName: string;
  stationCode: string;
  stationLon: stationLon;
  stationLat: stationLat;
  distance: distance;
  azimuth: azimuth;
  stationIntensity: stationIntensity;
  pga: pga;
  waveImageURI: string;
};

type stationLon = {
  unit: string;
  $t: string;
};

type stationLat = {
  unit: string;
  $t: string;
};

type distance = {
  unit: string;
  $t: string;
};

type azimuth = {
  unit: string;
  $t: string;
};

type stationIntensity = {
  unit: string;
  $t: string;
};

type pga = {
  unit: string;
  vComponent: string;
  nsComponent: string;
  ewComponent: string;
};

class RequestMaker {
  /**
   * @param {string} [apiKey="https://github.com/ExpTechTW"] The api key to uuse
   */
  constructor(apiKey?: string, apiVersion?: 0 | 1);

  readonly apiKey: string;
  readonly baseurl: string;

  /**
   * Makes a direct HTTP GET request to the api.
   * @param {string} endpoint
   * @param {Object} parms
   */
  get(endpoint: string, parms?: Object): Promise<any>;

  /**
   * Makes a direct HTTP POST request to the api.
   * @param {string} endpoint
   * @param {Object} body
   */
  post(endpoint: string, body?: Object): Promise<any>;
}

/**
 * The v1 ExpTech API wrapper
 */
class V1 extends RequestMaker {
  constructor(apiKey: string);
  earthquake: {
    /**
     * Fetch earthquake reports.
     * @param {number} [limit = 15] How many reports should be fetched.
     * @returns {EarthquakeReport[]} An array of EarthquakeReport
     * @example
     * // Fetch 10 reports
     * // will return a DetailedEarthquakeReport[]
     * const reports = await ExptechAPI.v1.earthquake.getReports(10);
     */
    getReports(limit?: number): Promise<EarthquakeReport[]>,

    /**
     * Fetch a specific earthquake report by its number.
     * @param {number} earthquakeNo The report number to fetch.
     * @returns {DetailedEarthquakeReport} DetailedEarthquakeReport
     * @example
     * // Fetch the report numbered 111127
     * // will return a DetailedEarthquakeReport
     * const report = await ExptechAPI.v1.earthquake.getReportByNumber(111127);
     */
    getReportByNumber(earthquakeNo?: number): Promise<DetailedEarthquakeReport>,
  }
}

declare module "@kamiya4047/exptech-api-wrapper" {
  export class ExptechAPI {
    /**
     * @param {string} [apiKey="https://github.com/ExpTechTW"] The api key to uuse
     */
    constructor(apiKey?: string);
    v1: V1;
  }
}