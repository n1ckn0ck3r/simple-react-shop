import styles from "./Shop.module.css";
import TypeBar from "../../components/TypeBar/TypeBar";
import GoodsList from "../../components/GoodsList/GoodsList";

const Shop = () => {
	return (
		<div className={styles.shop}>
			<TypeBar />
			<GoodsList />
		</div>
	);
};

export default Shop;
