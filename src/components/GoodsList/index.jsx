import { lazy, useCallback, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import data from "../../data.json";
import styles from "./GoodsList.module.css";

const GoodCard = lazy(() => import("../GoodCard"));

const GoodsList = () => {
	const { good, cart } = useContext(Context);

	useEffect(() => {
		cart.setCart(JSON.parse(localStorage.getItem("cart")) || []);
		good.setGoods(addGoods());
		good.setSelectedTypes(
			JSON.parse(localStorage.getItem("selected-categories")) || good.types
		);
		good.setSelectedMarkets(
			JSON.parse(localStorage.getItem("selected-markets")) || good.markets
		);
	}, [good, cart]);

	const addToCart = useCallback(
		(good) => {
			const [goods, isSimilar] = checkSimilarity(cart.cart, good);

			if (isSimilar) {
				cart.setCart(goods);
			} else {
				cart.setCart([
					...cart.cart,
					{
						id: good.id,
						title: good.title,
						price: good.price,
						category: good.category,
						market: good.market,
						amount: 1,
					},
				]);
			}

			localStorage.setItem("cart", JSON.stringify(cart.cart));
		},
		[cart]
	);

	const addGoods = () => {
		let temp = [];
		data.menu.forEach((el, index) => {
			temp.push({
				id: index,
				title: el.name,
				price: el.price,
				img: require(`../../assets${el.image}`),
				category: el.category,
				market: el.market,
			});
		});

		return temp;
	};

	const checkSimilarity = (goods, good) => {
		let isSimilar = false;

		const item = goods.find((el) => el.id === good.id);

		if (item) {
			item.amount += 1;
			isSimilar = true;
		}

		return [goods, isSimilar];
	};

	return (
		<div className={styles.goodsList}>
			{good.goods
				.filter(
					(item) =>
						good.selectedTypes.includes(item.category) &&
						good.selectedMarkets.includes(item.market)
				)
				.map((goodItem) => (
					<GoodCard
						key={goodItem.id}
						title={goodItem.title}
						price={goodItem.price}
						img={goodItem.img}
						category={goodItem.category}
						market={goodItem.market}
						addToCart={() => addToCart(goodItem)}
					/>
				))}
		</div>
	);
};

export default observer(GoodsList);
