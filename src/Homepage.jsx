import React from "react";

import { Link } from "react-router-dom";
import Style from "./Homepage.module.scss"

const Homepage = () => {
	return (
		<div>
			<h1>Homepage</h1>
			<Link to="/signup">
				<button className={Style.signup}>Sign up </button>
			</Link>
			<Link to="/login">
				<button className={Style.login}>Login </button>
			</Link>
		</div>
	);
};

export default Homepage;
