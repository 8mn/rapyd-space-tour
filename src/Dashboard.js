import axios from "axios";
import Style from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import RequestVirtualAccount from "./components/requestVirtualAccount/RequestVirtualAccount";
import { useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, db } from "../src/firebase";
import toast, { Toaster } from "react-hot-toast";
import cx from "classnames";

import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import Timer from "./components/Timer/Timer";

function Dashboard() {
	const [walletID, setWalletID] = useState(
		"ewallet_5d616c29e44b710fcb040c95a94eac72"
	);

	// const [virtualAccount, setvirtualAccount] = useState("");

	const [virtualAccounts, setVirtualAccounts] = useState([]);
	const [issuedBankAccount, setIssuedBankAccount] = useState(null);
	const [amountToPay, setAmountToPay] = useState(null);

	const [userDetails, setUserDetails] = useState(null);

	const [paymentCompleted, setPaymentCompleted] = useState(false);

	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		fetchvansfromDb();
	}, []);

	useEffect(() => {
		if (loading) return;
		if (!user) {
			navigate("/");
		} else {
			getUserDetails();
		}

		// fetchWalletID();
	}, [loading, user]);

	if (error) {
		return navigate("/");
	}

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
			setIssuedBankAccount(virtualAccountsArr[0].issuedBankAccountId);
			virtualAccountsArr = [];
		});
	};

	const getUserDetails = async () => {
		const userDetails = await getDoc(doc(db, `users/${user.uid}`));
		console.log(userDetails.data());
		setUserDetails(userDetails.data());
		if (!userDetails.data().depositPaid) {
			setAmountToPay(50000);
		} else {
			if (userDetails.data().paymentCompleted) {
				setAmountToPay(null);
				setPaymentCompleted(true);
			} else {
				setAmountToPay(100000);
			}
		}
	};

	const AmountData = {
		issued_bank_account: issuedBankAccount,
		amount: amountToPay,
		currency: "USD",
	};

	const simulateDepositPayment = () => {
		axios
			.post("http://localhost:5000/simulate-payment", AmountData)
			.then((res) => {
				console.log(res);
				if (res.data.statusCode === 200) {
					toast.success("Payment Successful");
					if (amountToPay === 50000) {
						depositPaid();
						setAmountToPay(100000);
					} else {
						paymentCompletedDb();
						setPaymentCompleted(true);
					}
				} else {
					toast.error("Payment failed, Please try again");
				}
			});
	};

	const depositPaid = async () => {
		await updateDoc(doc(db, `users/${user.uid}`), {
			depositPaid: true,
		});
		getUserDetails();
	};

	const paymentCompletedDb = async () => {
		await updateDoc(doc(db, `users/${user.uid}`), {
			paymentCompleted: true,
		});
	};

	const paymentClass = cx(Style.amount, {
		[Style.paymentCompleted]: paymentCompleted,
		[Style.paymentInComplete]: !paymentCompleted,
	});

	// const DepositClass = ;

	return (
		<div className={Style.App}>
			<Toaster position="top-right" reverseOrder={false} />
			{user && userDetails && (
				<>
					<nav>
						<div className={Style.container}>
							<div className={Style.logo}>Rapyd starliner</div>
							<button onClick={logout}>logout</button>
						</div>
					</nav>
					<div className={Style.dashboard}>
						<div className={Style.paymentInstructions}>
							{!userDetails.depositPaid
								? "Please make a deposit of $50,000 to continue"
								: paymentCompleted
								? "Payment Completed, Please check your email for the ticket"
								: " Plase make a payment of $100,000 to reserve your seat"}
							{}
						</div>
						<div className={Style.timeuntilLaunch}>
							<h1>Time until launch</h1>
							<Timer />
						</div>

						{/* <div className={Style.ticket}>
							<p>Ticket $150,000</p>
							<p>Launch details</p>
							<p>your ticket status</p>
							<div>Make a deposit($50,000)</div>
							<div>Pay the rest before launch($100,000)</div>
						</div> */}

						<div className={Style.paymentStatus}>
							<div
								className={cx(Style.amount, {
									[Style.depositPaid]: userDetails.depositPaid,
									[Style.depositNotPaid]: !userDetails.depositPaid,
								})}
								// style={{
								// 	backgroundColor:
								// 		amountToPay === 50000 ? "#fdadad" : "#ffffff",
								// }}
							>
								<div className={Style.type}>DEPOSIT</div>
								<div className={Style.price}>$50,000</div>
								{/* <div>Make the deposit</div> */}
							</div>
							<div
								className={paymentClass}
								// style={{
								// 	backgroundColor:
								// 		amountToPay === 100000 ? "#fdadad" : "#ffffff",
								// }}
							>
								<div className={Style.type}>REMAINING</div>
								<div className={Style.price}>$100,000</div>
								{/* <div>Pay the remaining amount</div> */}
							</div>
						</div>

						<RequestVirtualAccount
							walletID={walletID}
							virtualAccounts={virtualAccounts}
						/>
						<div className={Style.availableAccounts}>
							{/* {console.log(virtualAccount)} */}
							{virtualAccounts.map((van) => {
								return (
									<div
										className={Style.vanContainer}
										onClick={() =>
											setIssuedBankAccount(van.issuedBankAccountId)
										}
										key={van.issuedBankAccountId}
										style={{
											backgroundColor:
												van.issuedBankAccountId === issuedBankAccount
													? "#a1e3fd"
													: "",

											border:
												van.issuedBankAccountId === issuedBankAccount
													? "2px solid #1a769b"
													: "",
										}}
									>
										<div className={Style.field}>
											<div className={Style.label}>Account number</div>
											<p className={Style.data}>{van.account_number}</p>
										</div>
										<div className={Style.field}>
											<div className={Style.label}>Address</div>
											<p className={`${Style.data} ${Style.address}`}>
												{van.address}
											</p>
										</div>
										<div className={Style.field}>
											<div className={Style.label}>bank</div>
											<p className={`${Style.data}`}>{van.bank}</p>
										</div>
										<div className={Style.field}>
											<div className={Style.label}>beneficiary name</div>
											<p className={`${Style.data}`}>{van.beneficiary_name}</p>
										</div>
										<div className={Style.field}>
											<div className={Style.label}>bic</div>
											<p className={`${Style.data}`}>{van.bic}</p>
										</div>
										<div className={Style.field}>
											<div className={Style.label}>country</div>
											<p className={`${Style.data}`}>{van.country}</p>
										</div>
										<div className={Style.field}>
											<div className={Style.label}>country iso</div>
											<p className={`${Style.data}`}>{van.country_iso}</p>
										</div>
										<div className={Style.field}>
											<div className={Style.label}>zip</div>
											<p className={`${Style.data}`}>{van.zip}</p>
										</div>

										{/* <hr /> */}
									</div>
								);
							})}
							{/* <hr /> */}
						</div>

						{/* {issuedBankAccount && ( */}

						{!paymentCompleted ? (
							<div className={Style.payment}>
								<div>${amountToPay}</div>
								<button onClick={simulateDepositPayment}>PAY</button>
							</div>
						) : (
							""
						)}
						{/* // )} */}
					</div>
				</>
			)}
		</div>
	);
}

export default Dashboard;
