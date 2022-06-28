import { action, makeAutoObservable, observable } from "mobx";

export default class CartStore {
	constructor() {
		this._cart = [];
		makeAutoObservable(this, {
			_cart: observable,
			setCart: action,
		});
	}

	setCart(cart) {
		this._cart = cart;
	}

	get cart() {
		return this._cart;
	}
}
