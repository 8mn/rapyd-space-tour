import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Transactions from "./pages/Transactions/Transactions";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				|<Route path="/" element={<Homepage />} />
				|<Route path="dashboard" element={<Dashboard />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="transactions" element={<Transactions />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
