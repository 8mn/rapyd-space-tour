import axios from "axios";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase";
import Style from "./RequestVirtualAccount.module.scss";
import { v4 as uuidv4 } from "uuid";

const RequestVirtualAccount = ({
	walletID,
	setvirtualAccount,
	setIssuedBankAccount,
}) => {
	const data = {
		currency: "SGD",
		country: "SG",
		description: "Issue bank account number to wallet",
		ewallet: walletID,
		merchant_reference_id: uuidv4(),
		metadata: {
			merchant_defined: true,
		},
	};




	const handleClick = () => {
		axios
			.post("http://localhost:5000/request-virtual-account", data)
			.then((res) => {
				console.log(res);
				setvirtualAccount(res.data.body.data.bank_account);
				addVanToDb(res.data.body.data.bank_account);
				setIssuedBankAccount(res.data.body.data.id);
			});
	};

	const addVanToDb = async (van) => {
		await setDoc(doc(db, "virtual-accounts", uuidv4()), van);
	};

	return (
		<div className={Style.container}>
			<h4>Available virtual accounts</h4>

			<button onClick={handleClick}>Request VAN</button>
		</div>
	);
};

export default RequestVirtualAccount;
