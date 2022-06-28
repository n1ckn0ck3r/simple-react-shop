import React from "react";
import GoodsList from "../../components/GoodsList/GoodsList";
import TypeBar from "../../components/TypeBar/TypeBar";
import styles from "./Shop.module.css";

const Shop = () => {
	return (
		<div className={styles.shop}>
			<TypeBar />
			<GoodsList />
		</div>
	);
};

export default Shop;
