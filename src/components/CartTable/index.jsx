import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../..";
import { MAIN_ROUTE } from "../../utils/consts";
import styles from "./CartTable.module.css";

const CartTable = () => {
	const { cart, good } = useContext(Context);
	const [isEmpty, setIsEmpty] = useState(true);
	const navigate = useNavigate();
	const checkEmptiness = (goods) => (goods.length === 0 ? true : false);

	useEffect(() => {
		cart.setCart(JSON.parse(localStorage.getItem("cart")) || []);

		setIsEmpty(checkEmptiness(cart.cart));
	}, [cart]);

	const totalCost = !isEmpty
		? cart.cart.reduce(
				(total, current) => (total += current.price * current.amount),
				0
		  )
		: 0;

	const increaseGoods = (goods, goodID) => {
		const index = goods.findIndex((el) => el.id === goodID);
		goods[index].amount += 1;
		cart.setCart(goods);

		localStorage.setItem("cart", JSON.stringify(goods));
	};

	const decreaseGoods = (goods, goodID) => {
		const index = goods.findIndex((el) => el.id === goodID);
		goods[index].amount -= 1;

		if (goods[index].amount < 1) {
			goods.splice(index, 1);
		}
		cart.setCart(goods);

		setIsEmpty(checkEmptiness(cart.cart));

		localStorage.setItem("cart", JSON.stringify(goods));
	};

	const deleteGood = (goods, goodID) => {
		const index = goods.findIndex((el) => el.id === goodID);
		goods.splice(index, 1);
		cart.setCart(goods);

		setIsEmpty(checkEmptiness(cart.cart));

		localStorage.setItem("cart", JSON.stringify(goods));
	};

	const selectGood = (id) => {
		good.setSelectedGood(good.goods.find((item) => item.id === id));
		navigate(`/good/${id}`);
	};

	return (
		<div className={styles.table}>
			{isEmpty ? (
				<p id={styles.empty}>
					Ваша корзина пуста...{" "}
					<Link
						to={MAIN_ROUTE}
						style={{
							cursor: "pointer",
							textDecoration: "none",
							color: "blue",
						}}>
						Купите что-нибудь
					</Link>
				</p>
			) : (
				<p id={styles.notEmpty}>Корзиночка</p>
			)}
			{!isEmpty && (
				<table>
					<thead>
						<tr>
							<th className={styles.title}>Название</th>
							<th className={styles.price}>Цена</th>
							<th className={styles.amount}>Количество</th>
						</tr>
					</thead>
					<tbody>
						{cart.cart.map((item) => (
							<tr key={item.id}>
								<td
									className={styles.itemTitle}
									onClick={() => selectGood(item.id)}>
									{item.title}
								</td>
								<td className={styles.price}>
									{Number(item.price).toLocaleString("ru-RU", {
										style: "currency",
										currency: "RUB",
									})}
								</td>
								<td className={styles.amount}>
									<div className={styles.amounting}>
										<p>{item.amount}</p>
										<div className={styles.buttons}>
											<button
												onClick={action(() =>
													increaseGoods(cart.cart, item.id)
												)}>
												+
											</button>
											<button
												onClick={action(() =>
													decreaseGoods(cart.cart, item.id)
												)}>
												-
											</button>
											<button
												onClick={action(() => deleteGood(cart.cart, item.id))}>
												&#10006;
											</button>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{!isEmpty && (
				<div className={styles.totalCost}>
					<p>
						Общая стоимость товаров:{" "}
						{Number(totalCost).toLocaleString("ru-RU", {
							style: "currency",
							currency: "RUB",
						})}
					</p>
				</div>
			)}
		</div>
	);
};

export default observer(CartTable);
