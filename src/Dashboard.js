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
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Timer from "./components/Timer/Timer";

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


	let virtualAccountsArr = [];
	const fetchvansfromDb = async () => {
		// console.log("fetching vans from db");
		onSnapshot(collection(db, "virtual-accounts"), (snapshot) => {
			// console.log(snapshot);
			snapshot.forEach((doc) => {
				// console.log(doc.data());
				//make an array of all the virtual accounts
				virtualAccountsArr.push(doc.data());
			});
			setVirtualAccounts(virtualAccountsArr);
			virtualAccountsArr = [];
		});
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
						<Timer />
					</div>
					<div className="paymentStatus">
						<p>Pay the deposit: $50,000</p>
						<p>Pay the remaining amount: $100,000</p>
					</div>

					<RequestVirtualAccount
						walletID={walletID}
						// setvirtualAccount={setvirtualAccount}
						// setIssuedBankAccount={setIssuedBankAccount}
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
