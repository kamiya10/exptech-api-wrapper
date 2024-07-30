import { EewSource } from "./api";

interface RouteOptions {
	version?: 1 | 2;
	key?: string;
}

export default class Route {
	key: string;

	constructor(options: RouteOptions = {}) {
		this.key = options.key ?? "";
	}

	private get _lbBase() {
		return `https://lb-${Math.ceil(Math.random() * 4)}.exptech.dev` as const;
	}

	private get _apiBase() {
		return `https://api-${Math.ceil(Math.random() * 2)}.exptech.dev` as const;
	}

	private get _lb() {
		return `${this._lbBase}/api` as const;
	}

	private get _api() {
		return `${this._apiBase}/api` as const;
	}

	static websocket() {
		return `wss://lb-${Math.ceil(
			Math.random() * 4
		)}.exptech.com.tw/websocket` as const;
	}

	login() {
		return `https://api-1.exptech.dev/api/v3/et/login` as const;
	}

	reportList(limit: number = 50, page: number = 1) {
		const parms = new URLSearchParams({
			limit: `${limit}`,
			page: `${page}`,
			key: this.key,
		});
		return `${this._api}/v2/eq/report?${parms}` as const;
	}

	report(id: string) {
		return `${this._api}/v2/eq/report/${id}` as const;
	}

	rts(timestamp: number) {
		return `${this._lb}/v1/trem/rts?time=${timestamp}` as const;
	}

	eew(timestamp: number, type?: EewSource) {
		const parms = new URLSearchParams({
			timestamp: `${timestamp}`,
			type: `${type ?? ""}`,
		});
		return `${this._lb}/v1/eq/eew?${parms}` as const;
	}

	ntp() {
		return `${this._lbBase}/ntp` as const;
	}

	station() {
		return `${this._api}/v1/trem/station` as const;
	}
}
