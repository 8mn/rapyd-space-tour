import axios from "axios";
import Style from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import RequestVirtualAccount from "../../components/requestVirtualAccount/RequestVirtualAccount";
import { Link, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, db } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";

import { collection, doc, onSnapshot } from "firebase/firestore";
import Ticket from "../../components/Ticket/Ticket";
import Navbar from "../../components/Navbar/Navbar";
import AccountCard from "../../components/AccountCard/AccountCard";
import LaunchTimer from "../../components/LaunchTimer/LaunchTimer";

import rapydTicket from "../../assets/rapydTicket.png";
import PaymentStatus from "../../components/PaymentStatus/PaymentStatus";

function Dashboard() {
	// const [walletID, setWalletID] = useState(
	// 	"ewallet_5d616c29e44b710fcb040c95a94eac72"
	// );

	const walletID = "ewallet_46438dfcb97fe56ab6e133d800424c29";

	const [virtualAccounts, setVirtualAccounts] = useState([]);
	const [issuedBankAccount, setIssuedBankAccount] = useState(null);
	const [amountToPay, setAmountToPay] = useState(null);

	const [userDetails, setUserDetails] = useState(null);

	const [paymentCompleted, setPaymentCompleted] = useState(false);

	const [paymentLoading, setPaymentLoading] = useState(false);

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

		// axios
		// 	.get("http://localhost:5000/get-virtual-accounts")
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
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
		setPaymentLoading(true);
		axios
			.post(
				"https://rapyd-starliner-relay.herokuapp.com/simulate-payment",
				AmountData
			)
			.then((res) => {
				const transactions = res.data.body.data.transactions;
				console.log(res.data.body.data.transactions[transactions.length - 1]);

				const currentTransaction =
					res.data.body.data.transactions[transactions.length - 1];

				if (res.data.body.status.status === "SUCCESS") {
					toast.success("Payment Successful");
					setPaymentLoading(false);
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

	const payments = [
		{ amount: 50000, currency: "SGD", type: "deposit" },
		{ amount: 100000, currency: "SGD", type: "remaining" },
	];

	return (
		<div className={Style.App}>
			<Toaster
				position="top-center"
				reverseOrder={false}
				toastOptions={{
					duration: 7000,

					success: {
						theme: {
							background: "#31f2cc",
						},
					},
				}}
			/>
			{user && userDetails && (
				<>
					<Navbar userDetails={userDetails} />
					<div className={Style.dashboard}>
						<div className={Style.LaunchTimerContainer}>
							<div className={Style.LaunchTimerNav}>
								<h4>TIME UNTIL LAUNCH</h4>
								{/* <button>Launch schedule</button> */}
							</div>
							<div className={Style.timeuntilLaunch}>
								{/* <Timer /> */}
								<LaunchTimer />
							</div>
						</div>
						<PaymentStatus
							payments={payments}
							userDetails={userDetails}
							paymentCompleted={paymentCompleted}
						/>

						{paymentCompleted ? (
							<>
								<div className={Style.ticketNav}>
									<h4>YOUR TICKET</h4>
									<button>
										<a href={rapydTicket} download>
											Download
										</a>
									</button>
								</div>
								<div className={Style.ticket}>
									<Ticket userName={userDetails.name} />
								</div>
							</>
						) : (
							<>
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
					</div>
					{!paymentCompleted && (
						<div className={Style.paymentContainer}>
							<div className={Style.payment}>
								<div className={Style.amount}>
									${amountToPay.toLocaleString()}
								</div>
								<button onClick={simulateDepositPayment}>
									{paymentLoading ? "Processing payment..." : "Pay Now"}
									{/* {amountToPay === 50000 ? "Pay Deposit" : "Complete Payment"} */}
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}

export default Dashboard;
