import { makeAutoObservable } from "mobx";

export default class GoodStore {
	constructor() {
		this._goods = [];
		this._types = [];
		this._selectedTypes = this.types;
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

	get goods() {
		return this._goods;
	}

	get types() {
		return this._types;
	}

	get selectedTypes() {
		return this._selectedTypes;
	}
}
