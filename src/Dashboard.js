import axios from "axios";
import Style from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import RequestVirtualAccount from "./components/requestVirtualAccount/RequestVirtualAccount";
import { useNavigate } from "react-router-dom";
// Create a wallet
// display virtual account number
// make the deposit to virtual account number
// pay the rest of the amout before launch

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, db } from "../src/firebase";
import { async } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
	const [walletID, setWalletID] = useState(
		"ewallet_5d616c29e44b710fcb040c95a94eac72"
	);
	const [issuedBankAccount, setIssuedBankAccount] = useState("");
	const [virtualAccount, setvirtualAccount] = useState("");

	const [virtualAccounts, setVirtualAccounts] = useState([]);

	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) return;
		if (!user) return navigate("/");
		fetchvansfromDb();
		// fetchWalletID();
	}, [user, loading]);

	// const fetchWalletID = async() => {
	// 	const currentUser = await getDoc(doc(db, `users/${user?.uid}`))
	// 	// console.log()
	// 	setWalletID(currentUser.data().wallet_id);
	// }

	let virtualAccountsArr = [];
	const fetchvansfromDb = async () => {
		// console.log("fetching vans from db");
		const querySnapshot = await getDocs(collection(db, "virtual-accounts"));
		querySnapshot.forEach((doc) => {
			// console.log(doc.data());
			//make an array of all the virtual accounts
			virtualAccountsArr.push(doc.data());
		});
		// console.log(virtualAccounts);
		setVirtualAccounts(virtualAccountsArr);

		// console.log(vans)
	};

	const data = {
		issued_bank_account: issuedBankAccount,
		amount: "50000",
		currency: "EUR",
	};

	const simulateDepositPayment = () => {
		axios.post("http://localhost:5000/simulate-payment", data).then((res) => {
			console.log(res);
		});
	};
	const calculateTimeLeft = () => {
		let year = new Date().getFullYear();
		let difference = +new Date(`10/01/${year}`) - +new Date();

		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const [year] = useState(new Date().getFullYear());
	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval) => {
		if (!timeLeft[interval]) {
			return;
		}

		timerComponents.push(
			<span>
				{timeLeft[interval]} {interval}{" "}
			</span>
		);
	});




	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);


		return () => clearTimeout(timer);
	});

	return (
		<div className={Style.App}>
			{user && (
				<div className={Style.dashboard}>
					<nav>
						<div className="logo">Rapyd starliner</div>
						<button onClick={logout}>logout</button>
					</nav>
					{/* {console.log(walletID ? walletID : "No wallet id found")} */}
					<div className="timeuntilLaunch">
						<h1>Time until launch</h1>
						<div>
							{timerComponents.length ? (
								timerComponents
							) : (
								<span>Time's up!</span>
							)}
						</div>
					</div>
					<div className="paymentStatus">
						<p>Pay the deposit: $50,000</p>
						<p>Pay the remaining amount: $100,000</p>
					</div>

					<RequestVirtualAccount
						walletID={walletID}
						setvirtualAccount={setvirtualAccount}
						setIssuedBankAccount={setIssuedBankAccount}
					/>
					<div className={Style.availableAccounts}>
						{/* {console.log(virtualAccount)} */}
						{virtualAccounts.map((van) => {
							return (
								<div className={Style.vanContainer}>
									<p>{van.account_number}</p>
									<p>{van.address}</p>
									<p>{van.bank}</p>
									<p>{van.beneficiary_name}</p>
									<p>{van.bic}</p>
									<p>{van.country}</p>
									<p>{van.country_iso}</p>
									<p>{van.zip}</p>
									<button onClick={simulateDepositPayment}>
										simulate a transfer: pay $50,000
									</button>
									<button onClick={simulateDepositPayment}>
										simulate a transfer: pay $100,000
									</button>
									{/* <hr /> */}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

export default Dashboard;
