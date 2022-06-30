import { lazy, useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import data from "../../data.json";
import styles from "./TypeBar.module.css";

const CategoryList = lazy(() => import("../CategoryList"));
const MarketList = lazy(() => import("../MarketList"));

const TypeBar = () => {
	const { good } = useContext(Context);
	const [categoriesVisible, setCategoriesVisible] = useState(false);
	const [marketsVisible, setMarketsVisible] = useState(false);

	const addCategories = useCallback(() => {
		const temp = [];
		data.menu
			.map((item) => item.category)
			.forEach((item) => !temp.includes(item) && temp.push(item));

		return temp;
	}, []);

	const addMarkets = useCallback(() => {
		const temp = [];
		data.menu
			.map((item) => item.market)
			.forEach((item) => !temp.includes(item) && temp.push(item));

		return temp;
	}, []);

	useEffect(() => {
		good.setSelectedTypes(
			JSON.parse(localStorage.getItem("selected-categories")) || good.types
		);
		good.setSelectedMarkets(
			JSON.parse(localStorage.getItem("selected-markets")) || good.markets
		);
		good.setTypes(addCategories());
		good.setMarkets(addMarkets());
	}, [good, addCategories, addMarkets]);

	return (
		<div className={styles.typebar}>
			<div
				className={styles.categories}
				onMouseEnter={() => setCategoriesVisible(true)}
				onMouseLeave={() => setCategoriesVisible(false)}>
				<p>Фильтровать по категории</p>
				{categoriesVisible && <CategoryList categoryList={good.types} />}
			</div>
			<div
				className={styles.markets}
				onMouseEnter={() => setMarketsVisible(true)}
				onMouseLeave={() => setMarketsVisible(false)}>
				<p>Фильтровать по магазину</p>
				{marketsVisible && <MarketList marketList={good.markets} />}
			</div>
		</div>
	);
};

export default observer(TypeBar);
