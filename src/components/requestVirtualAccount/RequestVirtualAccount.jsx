import React from "react";

const RequestVirtualAccount = () => {
	const data = {
		currency: "EUR",
		country: "SG",
		description: "Issue bank account number to wallet",
		ewallet: "ewallet_5b42c481858aaa82c6369214b6bddf60",
		merchant_reference_id: "asdasdasdasdasq2121qsde",
		metadata: {
			merchant_defined: true,
		},
	};

	const handleClick = () => {
		axios
			.post("http://localhost:5000/request-virtual-account", data)
			.then((res) => {
				console.log(res);
			});
	};

	return (
		<div>
			<button onClick={handleClick}>Request VAN</button>
		</div>
	);
};

export default RequestVirtualAccount;
