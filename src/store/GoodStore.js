import { makeAutoObservable } from "mobx";

export default class GoodStore {
	constructor() {
		this._goods = [];
		this._types = [];
		this._selectedTypes = this.types;
		this._markets = [];
		this._selectedMarkets = this.markets;
		makeAutoObservable(this);
	}

	setGoods(goods) {
		this._goods = goods;
	}

	setTypes(types) {
		this._types = types;
	}

	setSelectedTypes(selectedTypes) {
		this._selectedTypes = selectedTypes;
	}

	setMarkets(markets) {
		this._markets = markets;
	}

	setSelectedMarkets(selectedMarkets) {
		this._selectedMarkets = selectedMarkets;
	}

	get goods() {
		return this._goods;
	}

	get types() {
		return this._types;
	}

	get selectedTypes() {
		return this._selectedTypes;
	}

	get markets() {
		return this._markets;
	}

	get selectedMarkets() {
		return this._selectedMarkets;
	}
}
