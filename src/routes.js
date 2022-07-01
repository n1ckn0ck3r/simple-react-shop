import Cart from "./pages/Cart";
import GoodInfo from "./pages/GoodInfo";
import Shop from "./pages/Shop";
import { CART_ROUTE, INFO_ROUTE, MAIN_ROUTE } from "./utils/consts";

export const routes = [
	{
		path: MAIN_ROUTE,
		Component: Shop,
	},
	{
		path: CART_ROUTE,
		Component: Cart,
	},
	{
		path: INFO_ROUTE,
		Component: GoodInfo,
	},
];
