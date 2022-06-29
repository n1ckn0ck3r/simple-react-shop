import styles from "./Cart.module.css";
import CartTable from "../../components/Table/CartTable";

const Cart = () => {
	return (
		<div className={styles.cart}>
			<CartTable />
		</div>
	);
};

export default Cart;
