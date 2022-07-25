import React from "react";
import Style from "./Navbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../firebase";
import { useState, useEffect, useRef } from "react";




const Navbar = ({ userDetails }) => {
	const location = useLocation();

	const [dropdownActive, setDropdownActive] = useState(false);
	const dropDownRef = useRef();

	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (
				dropdownActive &&
				dropDownRef.current &&
				!dropDownRef.current.contains(e.target)
			) {
				setDropdownActive(false);
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [dropdownActive]);

	return (
		<nav>
			<div className={Style.container}>
				<div className={Style.logo}>Rapyd starliner</div>
				<div className={Style["nav-right"]}>
					<div
						className={Style.dashboard}
						style={{
							backgroundColor:
								location.pathname === "/dashboard" ? "#31f2cc" : "none",
							borderRadius: "3px",
						}}
					>
						<Link to="/dashboard">
							<span>Dashboard</span>
						</Link>
					</div>
					<div
						style={{
							backgroundColor:
								location.pathname === "/transactions" ? "#31f2cc" : "none",
							borderRadius: "3px",
						}}
					>
						<Link to="/transactions">
							<span>Transactions</span>
						</Link>
					</div>
					<div className={Style["profile-right"]}>
						<div ref={dropDownRef}>
							<img
								className={Style.profile}
								src={`https://source.boringavatars.com/beam/120/${userDetails?.name}?colors=31f2cc,1a2b3b,F23157`}
								alt="User avatar"
								onClick={() => setDropdownActive(!dropdownActive)}
							></img>
							<div
								className={
									dropdownActive
										? `${Style["dropdownWrapper"]} 
						${Style.active}
						`
										: `${Style["dropdownWrapper"]} `
								}
								id="dropdownWrapper"
								style={{ width: "max-content" }}
							>
								<div className={Style["dropdown-profile-details"]}>
									<span className={Style["dropdown-profile-details--name"]}>
										{userDetails?.name}
									</span>
									<span className={Style["dropdown-profile-details--email"]}>
										{userDetails?.email}
									</span>
								</div>
								<div className={Style["dropdown-links"]}>
									<button onClick={logout}>Sign out</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
