import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import { Chat, Gossip, Login, Profile } from "./screens";
import { isLoggedIn } from "./firebase";
import { useEffect } from "react";

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/gossip"
				element={
					<PageWrapper>
						<Gossip />
					</PageWrapper>
				}
			/>
			<Route
				path="/chat"
				element={
					<PageWrapper>
						<Chat />
					</PageWrapper>
				}
			/>
			<Route
				path="/profile"
				element={
					<PageWrapper>
						<Profile />
					</PageWrapper>
				}
			/>
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

const PageWrapper = (props) => {
	const navigate = useNavigate();
	useEffect(() => {
		// Checked if logged in on first render
		isLoggedIn().then((LoggedIn) => !LoggedIn && navigate("/login"));
	}, []);

	return (
		<>
			<div className="page">{props.children}</div>
			<Navbar />
		</>
	);
};

export default App;
