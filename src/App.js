import axios from "axios";
import Style from "./App.module.scss";

// Create a wallet
// display virtual account number
// make the deposit to virtual account number
// pay the rest of the amout before launch

function App() {
	return (
		<div className={Style.App}>
			<ul>
				<li>1. Provide Personal information</li>
				<li>2. Access bank account number to make a deposit</li>
				<li>3. Make a deposit</li>
				<li>4. Make the rest of payment before launch</li>
			</ul>
		</div>
	);
}

export default App;
