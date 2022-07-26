import Style from "./PaymentStatus.module.scss";
import cx from "classnames";

const AlertIcon = () => {
	return (
		<div className={Style.alert}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#F23157"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<path d="M12 7v6m0 3.5v.5" />
			</svg>
		</div>
	);
};

const SuccessIcon = () => {
	return (
		<div className={Style.alert}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 24 24"
				fill="none"
				stroke="var(--green)"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M8 12.5l3 3 5-6" />
				<circle cx="12" cy="12" r="10" />
			</svg>
		</div>
	);
};

const PaymentStatus = ({ payments, userDetails, paymentCompleted }) => {
	const paymentClass = cx(Style.amount, {
		[Style.paymentCompleted]: paymentCompleted,
		[Style.paymentInComplete]: !paymentCompleted,
	});

	let depositClass;

	if (userDetails) {
		depositClass = cx(Style.amount, {
			[Style.depositPaid]: userDetails.depositPaid,
			[Style.depositNotPaid]: !userDetails.depositPaid,
		});
	}

	return (
		<div className={Style.paymentStatus}>
			{payments.map((payment) => (
				<div
					key={payment.type}
					className={payment.type === "deposit" ? depositClass : paymentClass}
				>
					<div>
						<div className={Style.type}>{payment.type}</div>
						<div className={Style.price}>
							${payment.amount.toLocaleString()}
						</div>
					</div>

					{
						//alert icon for payment not completed
						payment.type === "deposit" && !userDetails.depositPaid && (
							<AlertIcon />
						)
					}

					{
						//success icon for payment completed
						payment.type === "deposit" && userDetails.depositPaid && (
							<SuccessIcon />
						)
					}
					{
						//alert icon for payment not completed
						payment.type === "remaining" && !paymentCompleted && <AlertIcon />
					}

					{
						//success icon for payment completed
						payment.type === "remaining" && paymentCompleted && <SuccessIcon />
					}
				</div>
			))}
		</div>
	);
};

export default PaymentStatus;
