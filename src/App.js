import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import { Annoucment, Chat, Gossip, Login, Notifications, Profile } from "./screens";

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
				path="/annoucment"
				element={
					<PageWrapper>
						<Annoucment />
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
				path="/notifications"
				element={
					<PageWrapper>
						<Notifications />
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
	return (
		<>
			{/* If not logged in then go back */}
			{!localStorage.getItem("user") && <Navigate to="/login" replace />}
			{/* Show the page */}
			<div className="page">{props.children}</div>
			<Navbar />
		</>
	);
};

export default App;
