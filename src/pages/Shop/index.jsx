import { useEffect } from "react";
import styles from "./Shop.module.css";
import TypeBar from "../../components/TypeBar";
import GoodsList from "../../components/GoodsList";

const Shop = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.shop}>
			<TypeBar />
			<GoodsList />
		</div>
	);
};

export default Shop;
