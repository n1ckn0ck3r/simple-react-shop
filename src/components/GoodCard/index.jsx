import styles from "./GoodCard.module.css";

const GoodCard = ({ title, price, img, category, market, addToCart }) => {
	return (
		<div className={styles.parent}>
			<div className={styles.card}>
				<img src={img} alt="" />
				<p>{title}</p>
				<div className={styles.pricing}>
					<p>
						Цена: <br />
						{Number(price).toLocaleString("ru-RU", {
							style: "currency",
							currency: "RUB",
						})}
					</p>
					<button onClick={addToCart}>Ознакомиться</button>
				</div>
				<div className={styles.category}>
					<p>Категория: {category}</p>
					<p>Магазин: {market}</p>
				</div>
			</div>
		</div>
	);
};

export default GoodCard;
