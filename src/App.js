import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";

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
