import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import styles from "./CategoryList.module.css";

const CategoryList = ({ categoryList }) => {
	const { good } = useContext(Context);

	useEffect(() => {
		good.setSelectedCategories(
			JSON.parse(localStorage.getItem("selected-categories")) || good.categories
		);
	}, [good]);

	const toggleSelectedCategories = (event) => {
		const category = event.target.previousSibling.textContent;

		if (good.selectedCategories.includes(category)) {
			good.setSelectedCategories(
				good.selectedCategories.filter((item) => item !== category)
			);
		} else {
			good.setSelectedCategories([...good.selectedCategories, category]);
		}

		localStorage.setItem(
			"selected-categories",
			JSON.stringify(good.selectedCategories)
		);
	};

	const toggleAllSelectedCategories = () => {
		if (good.selectedCategories.length === good.categories.length) {
			good.setSelectedCategories([]);
		} else {
			good.setSelectedCategories(good.categories);
		}

		localStorage.setItem(
			"selected-categories",
			JSON.stringify(good.selectedCategories)
		);
	};

	return (
		<div className={styles.categoryList}>
			<div className={styles.category} key={"all"}>
				<label>Все</label>
				<input
					type={"checkbox"}
					checked={good.selectedCategories.length === good.categories.length}
					onChange={toggleAllSelectedCategories}
				/>
			</div>
			{categoryList.map((category) => (
				<div className={styles.category} key={category}>
					<label>{category}</label>
					<input
						type={"checkbox"}
						checked={good.selectedCategories.includes(category)}
						onChange={(event) => toggleSelectedCategories(event)}
					/>
				</div>
			))}
		</div>
	);
};

export default observer(CategoryList);
