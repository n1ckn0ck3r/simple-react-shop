import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import styles from "./GoodsList.module.css";
import GoodCard from "../GoodCard";

const GoodsList = () => {
	const { good } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		good.setSelectedCategories(
			JSON.parse(localStorage.getItem("selected-categories")) || good.categories
		);
		good.setSelectedMarkets(
			JSON.parse(localStorage.getItem("selected-markets")) || good.markets
		);
	}, [good]);

	const selectGood = (item) => {
		good.setSelectedGood(item);
		localStorage.setItem("selected-good", JSON.stringify(good.selectedGood));
		navigate(`/good/${item.id}`);
	};

	return (
		<div className={styles.goodsList}>
			{good.goods
				.filter(
					(item) =>
						good.selectedCategories.includes(item.category) &&
						good.selectedMarkets.includes(item.market)
				)
				.map((goodItem) => (
					<GoodCard
						key={goodItem.id}
						title={goodItem.title}
						price={goodItem.price}
						img={goodItem.image}
						category={goodItem.category}
						market={goodItem.market}
						addToCart={() => selectGood(goodItem)}
					/>
				))}
		</div>
	);
};

export default observer(GoodsList);
