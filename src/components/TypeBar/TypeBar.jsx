import React, { useCallback, useContext, useEffect } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import data from "../../data.json";
import styles from "./TypeBar.module.css";

const TypeBar = () => {
	const { good } = useContext(Context);

	const filtering = useCallback(() => {
		const temp = [];
		data.menu
			.map((item) => item.category)
			.forEach((item) => !temp.includes(item) && temp.push(item));

		return temp;
	}, []);

	useEffect(() => {
		good.setSelectedType(
			JSON.parse(localStorage.getItem("selected-category")) || ""
		);
		good.setTypes(filtering());
	}, [good, filtering]);

	const getType = (type) => {
		good.setSelectedType(type);
		localStorage.setItem(
			"selected-category",
			JSON.stringify(good.selectedType)
		);
	};

	return (
		<div className={styles.typebar}>
			{good.types.map((type) => (
				<button
					key={type}
					onClick={() => getType(type)}
					className={
						good.selectedType === type ? styles.active : styles.notActive
					}>
					{type}
				</button>
			))}
		</div>
	);
};

export default observer(TypeBar);
