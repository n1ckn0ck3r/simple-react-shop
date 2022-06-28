import React from "react";
import CartTable from "../../components/Table/CartTable";
import styles from "./Cart.module.css";

const Cart = () => {
	return (
		<div className={styles.cart}>
			<CartTable />
		</div>
	);
};

export default Cart;
