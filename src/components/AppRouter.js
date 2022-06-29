import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";

const AppRouter = () => {
	return (
		<Routes>
			{routes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} exact />
			))}
			<Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
		</Routes>
	);
};

export default AppRouter;
