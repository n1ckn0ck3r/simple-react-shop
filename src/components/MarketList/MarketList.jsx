import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import styles from "./MarketList.module.css";

const MarketList = ({ marketList }) => {
	const { good } = useContext(Context);

	useEffect(() => {
		good.setSelectedMarkets(
			JSON.parse(localStorage.getItem("selected-markets")) || good.markets
		);
	}, [good]);

	const toggleSelectedMarket = (event) => {
		const market = event.target.previousSibling.textContent;

		if (good.selectedMarkets.includes(market)) {
			good.setSelectedMarkets(
				good.selectedMarkets.filter((item) => item !== market)
			);
		} else {
			good.setSelectedMarkets([...good.selectedMarkets, market]);
		}

		localStorage.setItem(
			"selected-markets",
			JSON.stringify(good.selectedMarkets)
		);
	};

	const toggleAllSelectedMarkets = () => {
		if (good.selectedMarkets.length === good.markets.length) {
			good.setSelectedMarkets([]);
		} else {
			good.setSelectedMarkets(good.markets);
		}

		localStorage.setItem(
			"selected-markets",
			JSON.stringify(good.selectedMarkets)
		);
	};

	return (
		<div className={styles.marketList}>
			<div className={styles.markets} key={"all"}>
				<label>Все</label>
				<input
					type={"checkbox"}
					checked={good.selectedMarkets.length === good.markets.length}
					onChange={toggleAllSelectedMarkets}
				/>
			</div>
			{marketList.map((market) => (
				<div className={styles.markets} key={market}>
					<label>{market}</label>
					<input
						type={"checkbox"}
						checked={good.selectedMarkets.includes(market)}
						onChange={(event) => toggleSelectedMarket(event)}
					/>
				</div>
			))}
		</div>
	);
};

export default observer(MarketList);
