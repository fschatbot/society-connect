import { useEffect, useRef } from "react";
import "../styles/login.css";
import logo from "./assets/logo.png";
import { isLoggedIn, DB } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
	let inpRef = useRef(null);
	let inpErr = useRef(null);
	let passRef = useRef(null);
	let passErr = useRef(null);
	const navigate = useNavigate();

	function checkLogin() {
		DB.ref("accounts")
			.orderByChild("building")
			.equalTo(inpRef.current.value)
			.once("value")
			.then((snapshot) => {
				// Checking if the given building is correct
				if (!snapshot.exists()) return inpErr.current.classList.remove("hidden");
				else inpErr.current.classList.add("hidden");

				if (snapshot.numChildren() > 1) console.log("There is more than 1 match!");

				// Getting the 1st entry
				let [snapKey, match] = Object.entries(snapshot.val())[0];
				// Checking the password is a match
				if (match.password === passRef.current.value) {
					localStorage.setItem("user", snapKey);
					navigate("/gossip");
				} else {
					passErr.current.classList.remove("hidden");
				}
			});
	}

	useEffect(() => {
		// Checked if logged in on first render
		isLoggedIn().then((LoggedIn) => LoggedIn && navigate("/gossip"));
	}, []);

	return (
		<div className="page">
			<div className="formBox">
				<img src={logo} className="h-20" alt="Page Logo" />
				<h1 className="text-4xl font-bold">Society Connect</h1>
				<div className="inputContainer">
					<div className="inputWrapper">
						<input ref={inpRef} placeholder="Ex: B404" />
						<label>Flat No</label>
					</div>
					<p className="error hidden" ref={inpErr}>
						Invalid building Name
					</p>
				</div>
				<div className="inputContainer">
					<div className="inputWrapper">
						<input id="password" ref={passRef} placeholder=" " type="password" />
						<label htmlFor="password">Password</label>
					</div>
					<p className="error hidden" ref={passErr}>
						Invalid Password
					</p>
				</div>
				<div className="w-full flex justify-end">
					<button onClick={checkLogin}>Log In</button>
				</div>
			</div>
			<p>In case of queries regarding log in details please approch the moderator in B-404</p>
		</div>
	);
}

export default Login;
