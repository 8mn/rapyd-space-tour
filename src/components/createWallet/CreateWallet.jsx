import React from "react";

const CreateWallet = () => {
	const data = {
		first_name: "Johnas",
		last_name: "Doer",
		email: "",
		ewallet_reference_id: "asdasd123asdasdasdas",
		metadata: {
			merchant_defined: true,
		},
		phone_number: "",
		type: "person",
		contact: {
			phone_number: "+14155551311",
			email: "johndoe@rapyd.net",
			first_name: "Johnas",
			last_name: "Doee",
			mothers_name: "J Smith",
			contact_type: "personal",
			address: {
				name: "John Doe",
				line_1: "123 Main Street",
				line_2: "",
				line_3: "",
				city: "Anytown",
				state: "NY",
				country: "US",
				zip: "12345",
				phone_number: "+14155551111",
				metadata: {},
				canton: "",
				district: "",
			},
			identification_type: "PA",
			identification_number: "1234567890",
			date_of_birth: "11/22/2000",
			country: "US",
			nationality: "FR",
			metadata: {
				merchant_defined: true,
			},
		},
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios.post("http://localhost:5000/create-wallet", data).then((res) => {
			console.log(res);
		});
	};

	return (
		<div>
			<form action="submit" onSubmit={handleSubmit}>
				<div className={Style.inputGroup}>
					<label htmlFor="">first name</label>
					<input type="text" name="" id="" placeholder="first name" />
				</div>
				<div className={Style.inputGroup}>
					<label htmlFor="">Last name</label>
					<input type="text" name="" id="" placeholder="Last name" />
				</div>
				<div className={Style.inputGroup}>
					<label htmlFor="">Email</label>
					<input type="text" name="" id="" placeholder="Email" />
				</div>
				<div className={Style.inputGroup}>
					<label htmlFor="">Phone number</label>
					<input type="text" name="" id="" placeholder="Phone number" />
				</div>
				<button type="submit">create wallet</button>
			</form>
		</div>
	);
};

export default CreateWallet;
