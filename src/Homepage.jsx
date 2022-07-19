import React from "react";

import { Link } from "react-router-dom";
import Style from "./Homepage.module.scss";
import bgMain from "./assets/bgMain.jpg";
const Homepage = () => {
	return (
		<div
			className={Style.container}
			style={{
				backgroundImage: `url(${bgMain})`,
			}}
		>
			<nav>
				<h1 className={Style.logo}>Rapyd starliner</h1>
				<div className={Style["btn-container"]}>
					<Link to="/signup">
						<button className={Style.signup}>Sign up </button>
					</Link>
					<Link to="/login">
						<button className={Style.login}>Login </button>
					</Link>
				</div>
			</nav>

			<div className={Style.cta}>
				<div className={Style.header}>
					<h1 className={Style.heading}>Ready for mars and beyond?</h1>
					<div>
						Join 1 Million other humans to occupy mars. Reserve your seat at
						$150,000. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsum itaque quam recusandae. Velit numquam laborum doloribus saepe temporibus quam maxime ullam dolore? Repellendus cumque asperiores explicabo laboriosam architecto id.
					</div>
				</div>

				<div className={Style["btn-container"]}>
					<Link to="/signup">
						<button className={Style.signup}>Reserve your seat </button>
					</Link>

				</div>
			</div>
		</div>
	);
};

export default Homepage;
