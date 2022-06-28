import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import GoodStore from "./store/GoodStore";
import CartStore from "./store/CartStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

const good = new GoodStore();
const cart = new CartStore();

export const Context = createContext({ good, cart });

root.render(
	<Context.Provider value={{ good, cart }}>
		<App />
	</Context.Provider>
);
