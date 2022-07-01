import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GoodStore from "./store/GoodStore";
import CartStore from "./store/CartStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

const contextData = {
	good: new GoodStore(),
	cart: new CartStore(),
};

export const Context = createContext(contextData);

root.render(
	<Context.Provider value={contextData}>
		<App />
	</Context.Provider>
);
