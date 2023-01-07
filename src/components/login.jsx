import { useRef } from "react";
import "../styles/login.css";
import logo from "./assets/logo.png";

function Login() {
	let inpRef = useRef(null);
	let passRef = useRef(null);

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
					<p className="error hidden">Invalid building Name</p>
				</div>
				<div className="inputContainer">
					<div className="inputWrapper">
						<input id="password" ref={passRef} placeholder=" " type="password" />
						<label htmlFor="password">Password</label>
					</div>
					<p className="error hidden">Invalid Password</p>
				</div>
				<div className="w-full flex justify-end">
					<button>Log In</button>
				</div>
			</div>
			<p>In case of queries regarding log in details please approch the moderator in B-404</p>
		</div>
	);
}

export default Login;
