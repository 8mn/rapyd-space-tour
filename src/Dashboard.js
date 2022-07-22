import axios from "axios";
import Style from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import RequestVirtualAccount from "./components/requestVirtualAccount/RequestVirtualAccount";
import { Link, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, db } from "../src/firebase";
import toast, { Toaster } from "react-hot-toast";
import cx from "classnames";

import { collection, doc, onSnapshot } from "firebase/firestore";
import Ticket from "./components/Ticket/Ticket";
import Navbar from "./components/Navbar/Navbar";
import AccountCard from "./components/AccountCard/AccountCard";
import LaunchTimer from "./LaunchTimer/LaunchTimer";

function Dashboard() {
	const [walletID, setWalletID] = useState(
		"ewallet_5d616c29e44b710fcb040c95a94eac72"
	);

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
		onSnapshot(collection(db, "virtual-accounts"), (snapshot) => {
			snapshot.forEach((doc) => {
				virtualAccountsArr.push(doc.data());
			});
			setVirtualAccounts(virtualAccountsArr);
			setIssuedBankAccount(virtualAccountsArr[0].issuedBankAccountId);
			virtualAccountsArr = [];
		});
	};

	const getUserDetails = async () => {
		onSnapshot(doc(db, "users", user.uid), (doc) => {
			console.log(doc.data());

			const userdetailsFromDb = doc.data();
			setUserDetails(userdetailsFromDb);

			if (!userdetailsFromDb.depositPaid) {
				setAmountToPay(50000);
			} else {
				if (userdetailsFromDb.paymentCompleted) {
					setAmountToPay(null);
					setPaymentCompleted(true);
				} else {
					setAmountToPay(100000);
				}
			}
		});
	};

	const AmountData = {
		issued_bank_account: issuedBankAccount,
		amount: amountToPay,
		currency: "SGD",
		userID: user?.uid,
	};
	// "https://rapyd-starliner-backend.herokuapp.com/simulate-payment"

	const simulateDepositPayment = () => {
		axios
			.post(
				"https://rapyd-starliner-backend.herokuapp.com/simulate-payment",
				AmountData
			) 
			.then((res) => {
				const transactions = res.data.body.data.transactions;
				console.log(res.data.body.data.transactions[transactions.length - 1]);

				const currentTransaction =
					res.data.body.data.transactions[transactions.length - 1];

				if (res.data.body.status.status === "SUCCESS") {
					toast.success("Payment Successful");

					if (currentTransaction.amount === 50000) {
						setAmountToPay(100000);
					} else {
						setPaymentCompleted(true);
					}
				} else {
					toast.error("Payment failed, Please try again");
				}
			});
	};

	const paymentClass = cx(Style.amount, {
		[Style.paymentCompleted]: paymentCompleted,
		[Style.paymentInComplete]: !paymentCompleted,
	});

	return (
		<div className={Style.App}>
			<Toaster position="top-center" reverseOrder={false} />
			{user && userDetails && (
				<>
					<Navbar userDetails={userDetails} />
					<div className={Style.dashboard}>
						<div className={Style.paymentInstructions}>
							{!userDetails.depositPaid
								? "Please make a deposit of $50,000 to continue"
								: paymentCompleted
								? "Payment Completed, Brace for impact"
								: " Plase make a payment of $100,000 to reserve your seat"}
							{}
						</div>
						<div className={Style.timeuntilLaunch}>
							<h4>TIME UNTIL LAUNCH</h4>
							{/* <Timer /> */}
							<LaunchTimer />
						</div>

						{paymentCompleted ? (
							<>
								<h4>YOUR TICKET</h4>
								<div className={Style.ticket}>
									<Ticket userName={userDetails.name} />
								</div>
							</>
						) : (
							<>
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
									{virtualAccounts.map((van) => {
										return (
											<AccountCard
												van={van}
												setIssuedBankAccount={setIssuedBankAccount}
												issuedBankAccount={issuedBankAccount}
											/>
										);
									})}
								</div>
							</>
						)}

						{!paymentCompleted ? (
							<div className={Style.payment}>
								<div>${amountToPay}</div>
								<button onClick={simulateDepositPayment}>PAY</button>
							</div>
						) : (
							""
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Dashboard;
