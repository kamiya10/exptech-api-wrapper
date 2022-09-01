interface EarthquakeReport {
    identifier: string;
	earthquakeNo: number;
	epicenterLon: number;
	epicenterLat: number;
	location: string;
	depth: number;
	magnitudeValue: number;
	originTime: string;
	data: EarthquakeDetail[];
    ID: [];
}

interface EarthquakeDetail {
    areaName: string;
    areaIntensity: number;
    eqStation: EarthquakeStation[]
}

interface EarthquakeStation {
	stationName: string;
	stationLon: number;
	stationLat: number;
	distance: number;
	stationIntensity: number;
}


interface EEWData {
	Function: string;
	Type: string;
	Time: number;
	EastLongitude: string;
	NorthLatitude: string;
	Depth: number;
	Scale: string;
	FormatVersion: number;
	TimeStamp: number;
	"UTC+8": string;
	Version: number;
	APITimeStamp: string;
	ID: string;
	Location: string;
	Cancel: boolean;
	Unit: string;
	Test: boolean;
}

interface PAlertData {
	Function: string;
	TimeStamp: number;
	FormatVersion: number;
	Data: PGAData;
}

interface PGAData {
	data: Intensity[];
	time: string;
	unix: number;
	timestamp: number;
	station: number;
	final: boolean;
	img: string;
}

interface Intensity {
	loc: string;
	intensity: number;
}

interface APITimestamp {
	Value: number;
	Full: number;
}

declare class V1Data {
	constructor(apiKey: string)
	apiKey: String;

	/**
	 * Gets earthquake reports
	 * @param {number} limit
	 * @returns {EarthquakeReport[]}
	 */
	getEarthquakeReports(limit?: number): Promise<EarthquakeReport[]>;

	getRadarURL(): Promise<string>;

	getSatelliteURL(): Promise<string>;

	getAccumulationURL(): Promise<string>;

	getPrecipitationForecastURL(): Promise<string>;

	/**
	 *
	 * @param {number} time
	 * @returns {object}
	 */
	getRealtimeStationData(time?: number): Promise<object>;

	/**
	 * Gets the latest eew data
	 * @param {"JMA_earthquake" | "KMA_earthquake" | "NIED_earthquake" | "earthquake" | "FJDZJ_earthquake" | "ICL_earthquake"} provider
	 * @returns {EEWData}
	 */
	getEEW(provider: "JMA_earthquake" | "KMA_earthquake" | "NIED_earthquake" | "earthquake" | "FJDZJ_earthquake" | "ICL_earthquake"): Promise<EEWData>;

	/**
	 * Gets the latest realtime data
	 * @returns {PAlertData}
	 */
	getPAlertData(): Promise<PAlertData>;
}

/**
 * The v1 ExpTech API wrapper
 */
declare class V1 {
	constructor(apiKey: string);
	apiKey: string;
	data: V1Data;

	/**
     * Gets the current API timestamp.
     * @returns {Promise<APITimestamp>}
     */
	getAPITimestamp(): Promise<APITimestamp>;

	/**
	 * Check url safety
	 * @param {string} url The url to check
	 * @returns {boolean}
	 */
	isURLSafe(url: string): Promise<boolean>
}

declare class ExpTech {
	/**
	 * @param {string} [apiKey="https://github.com/ExpTechTW"] The api key to uuse
	 */
	constructor(apiKey?: string);
		apiKey: string;
		v1: V1;
}

declare module "exptech" {
	export default ExpTech;
}
