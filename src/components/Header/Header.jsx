import React from "react";
import { Link } from "react-router-dom";
import { CART_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import cartLogo from "../../assets/cart.png";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<Link to={MAIN_ROUTE} style={{ color: "#fff", textDecoration: "none" }}>
				Магазинчик
			</Link>
			<Link to={CART_ROUTE} style={{ textDecoration: "none" }}>
				<img src={cartLogo} width={32} height={32} alt="Корзина" />
			</Link>
		</div>
	);
};

export default Header;
