import { makeAutoObservable } from "mobx";
import data from "../data.json";

export default class GoodStore {
	data = data;

	constructor() {
		this._goods = [...this.fetchGoods()];
		this._prices = [...this.fetchPrices()];
		this._selectedGood = {};
		this._categories = [...this.fetchCategories()];
		this._selectedCategories = [];
		this._markets = [...this.fetchMarkets()];
		this._selectedMarkets = [];
		makeAutoObservable(this);
	}

	fetchGoods() {
		this.temp = [];
		this.data.menu.forEach((el, index) => {
			this.temp.push({
				id: index,
				title: el.name,
				description: el.description,
				price: el.price,
				image: require(`../assets${el.image}`),
				category: el.category,
				market: el.market,
				type: el.type,
				weight: el.weight,
				components: { ...el.components },
				amount: 1,
			});
		});

		return this.temp;
	}

	fetchPrices() {
		this.temp = [];
		this.data.menu.forEach((el, index) => {
			this.temp.push({
				id: index,
				price: el.price,
			});
		});

		return this.temp;
	}

	fetchCategories() {
		this.temp = [];
		this.data.menu
			.map((item) => item.category)
			.forEach((item) => !this.temp.includes(item) && this.temp.push(item));

		return this.temp;
	}

	fetchMarkets() {
		this.temp = [];
		this.data.menu
			.map((item) => item.market)
			.forEach((item) => !this.temp.includes(item) && this.temp.push(item));

		return this.temp;
	}

	setGoods(goods) {
		this._goods = goods;
	}

	setPrices(prices) {
		this._prices = prices;
	}

	setSelectedGood(good) {
		this._selectedGood = good;
	}

	setCategories(categories) {
		this._categories = categories;
	}

	setSelectedCategories(selectedCategories) {
		this._selectedCategories = selectedCategories;
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

	get prices() {
		return this._prices;
	}

	get selectedGood() {
		return this._selectedGood;
	}

	get categories() {
		return this._categories;
	}

	get selectedCategories() {
		return this._selectedCategories;
	}

	get markets() {
		return this._markets;
	}

	get selectedMarkets() {
		return this._selectedMarkets;
	}
}
