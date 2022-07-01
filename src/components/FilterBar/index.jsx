import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import styles from "./FilterBar.module.css";
import CategoryList from "../CategoryList";
import MarketList from "../MarketList";

const FilterBar = () => {
	const { good } = useContext(Context);
	const [categoriesVisible, setCategoriesVisible] = useState(false);
	const [marketsVisible, setMarketsVisible] = useState(false);

	useEffect(() => {
		good.setSelectedCategories(
			JSON.parse(localStorage.getItem("selected-categories")) || good.categories
		);
		good.setSelectedMarkets(
			JSON.parse(localStorage.getItem("selected-markets")) || good.markets
		);
	}, [good]);

	return (
		<div className={styles.filterBar}>
			<div
				className={styles.categories}
				onMouseEnter={() => setCategoriesVisible(true)}
				onMouseLeave={() => setCategoriesVisible(false)}>
				<p>Фильтровать по категории</p>
				{categoriesVisible && <CategoryList categoryList={good.categories} />}
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

export default observer(FilterBar);
