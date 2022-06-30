import { Link } from "react-router-dom";
import { CART_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import cartLogo from "../../assets/cart.png";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<Link to={MAIN_ROUTE} className={styles.link}>
				Магазинчик
			</Link>
			<Link to={CART_ROUTE} className={styles.link}>
				<img src={cartLogo} width={32} height={32} alt="Корзина" />
			</Link>
		</div>
	);
};

export default Header;
