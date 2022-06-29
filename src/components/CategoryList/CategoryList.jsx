import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import styles from "./CategoryList.module.css";

const CategoryList = ({ categoryList }) => {
	const { good } = useContext(Context);

	useEffect(() => {
		good.setSelectedTypes(
			JSON.parse(localStorage.getItem("selected-categories")) || []
		);
	}, [good]);

	const toggleSelectedCategories = (event) => {
		const category = event.target.previousSibling.textContent;

		if (good.selectedTypes.includes(category)) {
			good.setSelectedTypes(
				good.selectedTypes.filter((item) => item !== category)
			);
		} else {
			good.setSelectedTypes([...good.selectedTypes, category]);
		}

		localStorage.setItem(
			"selected-categories",
			JSON.stringify(good.selectedTypes)
		);
	};

	const toggleAllSelectedCategories = () => {
		if (good.selectedTypes.length === good.types.length) {
			good.setSelectedTypes([]);
		} else {
			good.setSelectedTypes(good.types);
		}

		localStorage.setItem(
			"selected-categories",
			JSON.stringify(good.selectedTypes)
		);
	};

	return (
		<div className={styles.categoryList}>
			<div className={styles.category} key={"all"}>
				<label>Все</label>
				<input
					type={"checkbox"}
					checked={good.selectedTypes.length === good.types.length}
					onChange={toggleAllSelectedCategories}
				/>
			</div>
			{categoryList.map((category) => (
				<div className={styles.category} key={category}>
					<label>{category}</label>
					<input
						type={"checkbox"}
						checked={good.selectedTypes.includes(category)}
						onChange={(event) => toggleSelectedCategories(event)}
					/>
				</div>
			))}
		</div>
	);
};

export default observer(CategoryList);
