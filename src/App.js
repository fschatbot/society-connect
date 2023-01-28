import "./App.css";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import { isLoggedIn } from "./firebase";
import { useEffect } from "react";

// Importing Screen Elements
import { Suspense, lazy } from "react";
import HashLoader from "react-spinners/HashLoader";
const Chat = lazy(() => import("./components/screens/chat"));
const Gossip = lazy(() => import("./components/screens/gossip"));
const Login = lazy(() => import("./components/login"));
const Profile = lazy(() => import("./components/screens/profile"));
const ChatPage = lazy(() => import("./components/screens/chatPage"));

function App() {
	return (
		<Suspense
			fallback={
				<div className="loadingScreen">
					<HashLoader color="#36d7b7" />
				</div>
			}>
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
				<Route path="/chat/:id" element={<ChatPage />} />
				<Route
					path="/chat"
					element={
						<PageWrapper>
							<Chat />
						</PageWrapper>
					}
				/>
				<Route
					path="/profile/:id?"
					element={
						<PageWrapper>
							<Profile />
						</PageWrapper>
					}
				/>
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</Suspense>
	);
}

const PageWrapper = (props) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!navigate) return;
		// Checked if logged in on first render
		isLoggedIn().then((LoggedIn) => !LoggedIn && navigate("/login"));
	}, [navigate]);

	return (
		<>
			<div className="page">{props.children}</div>
			<Navbar />
		</>
	);
};

export default App;
