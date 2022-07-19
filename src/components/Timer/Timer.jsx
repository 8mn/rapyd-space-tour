import { useState, useEffect } from "react";
import Style from "./Timer.module.scss";

const Timer = () => {
	const calculateTimeLeft = () => {
		let year = new Date().getFullYear();
		let difference = +new Date(`10/01/${year}`) - +new Date();

		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const [year] = useState(new Date().getFullYear());
	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval) => {
		if (!timeLeft[interval]) {
			return;
		}

		timerComponents.push(
			<span>
				{timeLeft[interval]} {interval}{" "}
			</span>
		);
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	});
	return (
		<div className={Style.container}>
			{timerComponents.length ? timerComponents : <span>Time's up!</span>}
			{/* {console.log(timerComponents)} */}
		</div>
	);
};

export default Timer;
