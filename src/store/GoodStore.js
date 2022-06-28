import { makeAutoObservable } from "mobx";

export default class GoodStore {
	constructor() {
		this._goods = [];
		this._filteredGoods = [];
		this._types = [];
		this._selectedType = "";
		makeAutoObservable(this);
	}

	setGoods(goods) {
		this._goods = goods;
	}

	setFilteredGoods(filteredGoods) {
		this._filteredGoods = filteredGoods;
	}

	setTypes(types) {
		this._types = types;
	}

	setSelectedType(selectedType) {
		this._selectedType = selectedType;
	}

	get goods() {
		return this._goods;
	}

	get filteredGoods() {
		return this._filteredGoods;
	}

	get types() {
		return this._types;
	}

	get selectedType() {
		return this._selectedType;
	}
}
