import { useRef } from "react";
import "../styles/login.css";
import logo from "./assets/logo.png";
import * as fireDB from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
	let inpRef = useRef(null);
	let inpErr = useRef(null);
	let passRef = useRef(null);
	let passErr = useRef(null);
	const navigate = useNavigate();

	function checkLogin() {
		fireDB.Get("accounts", (snapshot) => {
			let found = false;
			snapshot.forEach((snap) => {
				let user = snap.val();
				// console.log(user.building, user.password);
				if (inpRef.current.value.toLowerCase() == user.building.toLowerCase()) {
					found = true;
					if (passRef.current.value == user.password) {
						// Login was a success
						localStorage.setItem("user", snap.key);
						navigate("/gossip");
					} else {
						passErr.current.classList.remove("hidden");
					}
				}
			});
			inpErr.current.classList.remove("hidden");
		});
	}

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
					<p className="error hidden" ref={inpErr}>
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
