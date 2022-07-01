import React, { useContext, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { MAIN_ROUTE } from "../../utils/consts";
import styles from "./GoodInfo.module.css";
import { Context } from "../../index";

const GoodInfo = () => {
	const { good, cart } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate();
	const [isExists, setIsExists] = useState(false);

	const checkExistenсe = useCallback(
		(id) => {
			if (good.selectedGood.id === Number(id)) {
				return true;
			}

			const item = good.goods.find((item) => item.id === Number(id));

			if (item) {
				good.setSelectedGood(item);
				localStorage.setItem(
					"selected-item",
					JSON.stringify(good.selectedGood)
				);
				return true;
			}

			return false;
		},
		[good]
	);

	useEffect(() => {
		cart.setCart(JSON.parse(localStorage.getItem("cart")) || []);
		setIsExists(checkExistenсe(params.id));
	}, [cart, params, checkExistenсe]);

	const addToCart = useCallback(
		(item) => {
			const [goods, isSimilar] = checkSimilarity(cart.cart, item);

			if (isSimilar) {
				cart.setCart(goods);
			} else {
				cart.setCart([
					...cart.cart,
					{
						id: item.id,
						title: item.title,
						price: item.price,
						amount: item.amount,
					},
				]);
			}

			localStorage.setItem("cart", JSON.stringify(cart.cart));
			console.log(
				`Товар ${good.selectedGood.title} успешно добавлен в корзину`
			);
			navigate(MAIN_ROUTE);
		},
		[cart, navigate, good.selectedGood.title]
	);

	const checkSimilarity = (goods, good) => {
		let isSimilar = false;

		const item = goods.find((el) => el.id === good.id);

		if (item) {
			item.amount += 1;
			isSimilar = true;
		}

		return [goods, isSimilar];
	};

	const increaseGoods = () => {
		good.selectedGood.amount++;
		good.selectedGood.price =
			good.prices.find((item) => item.id === good.selectedGood.id).price *
			good.selectedGood.amount;
		good.setSelectedGood(good.selectedGood);
		localStorage.setItem("selected-item", JSON.stringify(good.selectedGood));
	};

	const decreaseGoods = () => {
		if (good.selectedGood.amount > 1) {
			good.selectedGood.amount--;
			good.selectedGood.price =
				good.prices.find((item) => item.id === good.selectedGood.id).price *
				good.selectedGood.amount;
			good.setSelectedGood(good.selectedGood);
			localStorage.setItem("selected-item", JSON.stringify(good.selectedGood));
		} else {
			alert("Больше нельзя уменьшать");
		}
	};

	return (
		<div className={styles.info}>
			{!isExists ? (
				<p className={styles.notFound}>
					К сожалению, такого товара нет, но вы можете вернуться на основную
					страницу магазина, нажав <Link to={MAIN_ROUTE}> данную ссылку</Link>
				</p>
			) : (
				<div className={styles.container}>
					<div className={styles.sides}>
						<div className={styles.leftSide}>
							<img src={good.selectedGood.image} alt="Изображение" />
							<div className={styles.price}>
								<p>Цена: {good.selectedGood.price} руб.</p>
							</div>
						</div>
						<div className={styles.rightSide}>
							<div className={styles.title}>
								<p>{good.selectedGood.title}</p>
							</div>
							<div className={styles.allTypes}>
								<div className={styles.type}>{good.selectedGood.category}</div>
								<div className={styles.type}>{good.selectedGood.market}</div>
								<div className={styles.type}>{good.selectedGood.type}</div>
								<div className={styles.type}>{good.selectedGood.weight}</div>
							</div>
							<div className={styles.description}>
								{good.selectedGood.description}
							</div>
							<div className={styles.componentBlock}>
								<div className={styles.componentTitle}>
									<p>Компоненты</p>
								</div>
								<div className={styles.components}>
									{[1, 2, 3, 4, 5].map((item) => (
										<div className={styles.componentItem} key={item}>
											{item}
										</div>
									))}
								</div>
							</div>
							<div className={styles.countBlock}>
								<div className={styles.countTitle}>Количество</div>
								<div className={styles.counting}>
									{good.selectedGood.amount}
								</div>
								<div
									className={styles.counting}
									id={styles.increase}
									onClick={action(() => increaseGoods())}>
									+
								</div>
								<div
									className={styles.counting}
									id={styles.decrease}
									onClick={action(() => decreaseGoods())}>
									-
								</div>
							</div>
						</div>
					</div>
					<div
						className={styles.submitButton}
						onClick={() => addToCart(good.selectedGood)}>
						<p>Добавить в корзину</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default observer(GoodInfo);
