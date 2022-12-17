import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import { Annoucment, Chat, Gossip, Login, Notifications, Profile } from "./screens";

function App() {
	return (
		<>
			<div className="page">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/gossip" element={<Gossip />} />
					<Route path="/annoucment" element={<Annoucment />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/notifications" element={<Notifications />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</div>
			<Navbar />
		</>
	);
}

export default App;
