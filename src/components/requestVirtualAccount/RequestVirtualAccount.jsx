import axios from "axios";
import { doc,setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Style from "./RequestVirtualAccount.module.scss";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const RequestVirtualAccount = ({ walletID, virtualAccounts }) => {
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
			.post(
				"https://rapyd-starliner-backend.herokuapp.com/request-virtual-account",
				data
			)
			.then((res) => {
				console.log(res);
				// setvirtualAccount(res.data.body.data.bank_account);

				const van = {
					...res.data.body.data.bank_account,
					issuedBankAccountId: res.data.body.data.id,
				};

				addVanToDb(van);
				// setIssuedBankAccount(res.data.body.data.id);
			});
		};
		
		const addVanToDb = async (van) => {
			await setDoc(doc(db, "virtual-accounts", uuidv4()), van);
			toast.success("New Account added successfully");
	};

	return (
		<>
		{/* <Toaster /> */}
			<div className={Style.container}>
				<h4>Available accounts</h4>

				<button onClick={handleClick}>Request VAN</button>
			</div>

			{/* <div className={Style.instructions}>
				 Make a payment to any of the following accounts
			</div> */}
		</>
	);
};

export default RequestVirtualAccount;
