import React from "react";

import { Link } from "react-router-dom";
import Style from "./Homepage.module.scss";

import LaunchTimer from "./components/LaunchTimer/LaunchTimer";

const Homepage = () => {
	return (
		<div className={Style.App}>
			<div className={Style.container}>
				<div className={Style.bg}>
					<div className={Style.navbarContainer}>
						<div className={Style.navbar}>
							<h4 className={Style.logo}>Rapyd starliner</h4>
							<div className={Style["btn-container"]}>
								<Link to="/signup">
									<button className={Style.signup}>Sign up </button>
								</Link>
								<Link to="/login">
									<button className={Style.login}>Login </button>
								</Link>
							</div>
						</div>
					</div>
					<div className={Style.cta}>
						<div className={Style.header}>
							<h1 className={Style.heading}>Ready for mars and beyond?</h1>
							<div className={Style.desc}>
								Join 1 Million other humans to occupy mars. Reserve your seat at
								$150,000. Lorem ipsum dolor sit amet consectetur adipisicing
								elit. Est ipsum itaque quam recusandae. Velit numquam laborum
								doloribus saepe temporibus quam maxime ullam dolore? Repellendus
								cumque asperiores explicabo laboriosam architecto id.
							</div>
						</div>

						<div className={Style["btn-container"]}>
							<Link to="/signup">
								<button className={Style.signup}>Reserve your seat </button>
							</Link>
						</div>
						{/* <div className={Style.Timer}>
							<h4>Time until launch</h4>
							<LaunchTimer />
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
