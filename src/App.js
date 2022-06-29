import { lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";

const Header = lazy(() => import("./components/Header/Header"));

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<AppRouter />
			</BrowserRouter>
		</div>
	);
}

export default App;
