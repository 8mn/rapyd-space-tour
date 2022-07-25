import { useState, useEffect } from "react";
import Style from "./Transactions.module.scss";
import { getDoc, doc } from "firebase/firestore";

import { db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, logout } from "../src/firebase";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const Transactions = () => {
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();
	const [userDetails, setUserDetails] = useState(null);

	useEffect(() => {
		if (loading) return;
		if (!user) {
			navigate("/");
		} else {
			getUserDetails();
		}
	}, [loading, user]);

	const getUserDetails = async () => {
		const userDetails = await getDoc(doc(db, `users/${user.uid}`));
		// console.log(userDetails.data());
		setUserDetails(userDetails.data());
	};

	function timeConverter(UNIX_timestamp) {
		var a = new Date(UNIX_timestamp * 1000);
		var months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes();
		var sec = a.getSeconds();
		var time =
			date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
		return time;
	}

	return (
		<>
			{userDetails && userDetails.transactions ? (
				<div>
					<Navbar userDetails={userDetails} />
					<div className={Style.container}>
						{/* {console.log(userDetails)} */}
						{userDetails.transactions.map((t) => (
							<div key={t.id} className={Style.transaction}>
								<div>
									<div className={Style.amount}>
										{t.data.currency} {t.data.amount.toLocaleString()}
									</div>
									<div className="idContainer">
										<div className="label">
										{t.data.issuing_transaction_id}</div>
									</div>
								</div>
								<div className={Style.created}>
									{timeConverter(t.created_at)}
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<>
					<Navbar userDetails={userDetails} />
					<div className={Style.container}>
						<h2>No transactions to show</h2>
					</div>
				</>
			)}
		</>
	);
};

export default Transactions;
