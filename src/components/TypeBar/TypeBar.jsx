import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import data from "../../data.json";
import styles from "./TypeBar.module.css";
import CategoryList from "../CategoryList/CategoryList";

const TypeBar = () => {
	const { good } = useContext(Context);
	const [isVisible, setIsVisible] = useState(false);

	const filtering = useCallback(() => {
		const temp = [];
		data.menu
			.map((item) => item.category)
			.forEach((item) => !temp.includes(item) && temp.push(item));

		return temp;
	}, []);

	useEffect(() => {
		good.setSelectedTypes(
			JSON.parse(localStorage.getItem("selected-categories")) || []
		);
		good.setTypes(filtering());
	}, [good, filtering]);

	return (
		<div className={styles.typebar}>
			<div
				className={styles.categories}
				onMouseEnter={() => setIsVisible(true)}
				onMouseLeave={() => setIsVisible(false)}>
				<p>Фильтровать по категории</p>
				{isVisible && <CategoryList categoryList={good.types} />}
			</div>
		</div>
	);
};

export default observer(TypeBar);
