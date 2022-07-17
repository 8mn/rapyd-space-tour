import { useState, useEffect } from "react";
import Style from "./Login.module.scss"
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// todo check correct import
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// import auth from "./firebase"
import GoogleLogin from "./components/GoogleLogin/GoogleLogin";

function Login() {
	const [passwordShown, setPasswordShown] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const togglePassword = () => {
		setPasswordShown(!passwordShown);
	};

	useEffect(() => {
		if (loading) {
			console.log("loading....");
			return;
		}
		if (user) navigate("/dashboard");
	}, [user, loading]);

	const handleLogin = (e) => {
		e.preventDefault();
		console.log(email);
		console.log(password);
		logInWithEmailAndPassword(email, password);
	};

	return (
		<div className={Style.container}>
			<div className={Style.logo}>Photoboard</div>
			<div className={Style.formContainer}>
				<Toaster
					// position="top-right"
					reverseOrder={false}
					toastOptions={{
						style: {
							fontSize: "2rem",
						},
					}}
				/>
				{/* <Link to="/">
					<div className={Style.home}>Home</div>
				</Link> */}
				{/* <div className={Style.formField}>
				<label htmlFor="username">Username</label>
                <input type="text" placeholder="username" />
			</div> */}
				<h1>Log In</h1>
				<GoogleLogin />
				<div className={Style.divider}>
					<span className={Style.line}></span>
					<span className={Style.text}>or</span>
					<span className={Style.line}></span>
				</div>
				<form onSubmit={handleLogin}>
					<div className={Style.formField}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							placeholder="Email"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={Style.formField}>
						<label htmlFor="username">Password</label>
						<input
							type={passwordShown ? "text" : "password"}
							placeholder="Password"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className={Style.checkbox}>
						<input
							type="checkbox"
							name="Show password"
							id="check"
							onClick={togglePassword}
						/>
						<label htmlFor="check" style={{ margin: ".7rem" }}>
							Show password
						</label>
					</div>
					<button type="submit" className={Style.submitBtn}>
						Log in
					</button>
				</form>
				<div className={Style.linkto}>
					Need an account? <Link to="/signup">Sign up</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
