import toast from "react-hot-toast";
import Style from "./AccountCard.module.scss";

const AccountCard = ({ van, setIssuedBankAccount, issuedBankAccount }) => {
	return (
		<div
			className={Style.vanContainer}
			onClick={() => setIssuedBankAccount(van.issuedBankAccountId)}
			key={van.issuedBankAccountId}
			style={{
				backgroundColor:
					van.issuedBankAccountId === issuedBankAccount ? "#d6fcf5" : "",

				border:
					van.issuedBankAccountId === issuedBankAccount
						? "2px solid var(--green)"
						: "",
			}}
		>
			<div className={Style.field}>
				<div className={Style.label}>Account number</div>
				<p
					className={`${Style.data} ${Style.accountNumber}`}
					onClick={() => {
						navigator.clipboard.writeText(van.account_number);
						toast.success("Copied to clipboard");
					}}
				>
					<div>{van.account_number}</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="ai ai-Copy"
					>
						<path d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z" />
						<path d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
					</svg>
				</p>
			</div>
			<div className={Style.field}>
				<div className={Style.label}>Address</div>
				<p className={`${Style.data} ${Style.address}`}>{van.address}</p>
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
};

export default AccountCard;
