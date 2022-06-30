import { useEffect } from "react";
import styles from "./Cart.module.css";
import CartTable from "../../components/CartTable";

const Cart = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.cart}>
			<CartTable />
		</div>
	);
};

export default Cart;
