import Style from "./LaunchTimer.module.scss";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
	const { seconds, minutes, hours, days } = useTimer({
		expiryTimestamp,
		onExpire: () => console.warn("onExpire called"),
	});

	return (
		<div style={{ textAlign: "center" }} className={Style.container}>
			<div className={Style.timer}>
				<div className={Style.block}>
					<span className={Style.heading}>DAYS</span>
					<span>
						{days < 10 ? "0" : ""}
						{days}
					</span>
				</div>
				:
				<div className={Style.block}>
					<span className={Style.heading}>HOURS</span>
					<span>
						{hours < 10 ? "0" : ""}
						{hours}
					</span>
				</div>
				:
				<div className={Style.block}>
					<span className={Style.heading}>MINUTES</span>
					<span>
						{minutes < 10 ? "0" : ""}
						{minutes}
					</span>
				</div>
				:
				<div className={Style.block}>
					<span className={Style.heading}>SECONDS</span>
					<span>
						{seconds < 10 ? "0" : ""}
						{seconds}
					</span>
				</div>
			</div>
		</div>
	);
}

export default function LaunchTimer() {
	const time = new Date();
	time.setSeconds(time.getSeconds() + 7890000); // 90 days till launch
	return (
		<div>
			<MyTimer expiryTimestamp={time} />
		</div>
	);
}
