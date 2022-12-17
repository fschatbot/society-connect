import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
	return (
		<>
			<div className="page">
				<Routes>
					<Route index element={<Home />} />
				</Routes>
			</div>
			<Navbar />
		</>
	);
}

function Home() {
	return <></>;
}

export default App;
