import Style from "./Ticket.module.scss";
const Ticket = ({ userName }) => {
	return (
		<>
			<div className={Style["main-content"]}>
				<div className={Style.ticket}>
					<div className={Style.ticket__main}>
						<div className={Style.header}>Rapyd starliner</div>
						<div className={`${Style.info} ${Style.passenger}`}>
							<div className={Style.info__item}>Passenger</div>
							<div className={Style.info__detail}>{userName}</div>
						</div>
						<div className={`${Style.info} ${Style.platform}`}>
							{" "}
							<span>Depart </span>
							<span>from </span>
							<span>platform</span>
							<div className={Style.number}>
								<div>9</div>
								<div>
									{" "}
									<span>3</span>
									<span>4</span>
								</div>
							</div>
						</div>
						<div className={`${Style.info} ${Style.departure}`}>
							<div className={Style.info__item}>Depart</div>
							<div className={Style.info__detail}>
								Kennedy Space Center, Earth
							</div>
						</div>
						<div className={`${Style.info} ${Style.arrival}`}>
							<div className={Style.info__item}>Arrive</div>
							<div className={Style.info__detail}>mars</div>
						</div>
						<div className={`${Style.info} ${Style.date}`}>
							<div className={Style.info__item}>Date</div>
							<div className={Style.info__detail}>1 Oct 2022</div>
						</div>
						<div className={`${Style.info} ${Style.time}`}>
							<div className={Style.info__item}>Time</div>
							<div className={Style.info__detail}>11:00AM</div>
						</div>
						<div className={`${Style.info} ${Style.carriage}`}>
							<div className={Style.info__item}>ship</div>
							<div className={Style.info__detail}>4</div>
						</div>
						<div className={`${Style.info} ${Style.seat}`}>
							<div className={Style.info__item}>Seat</div>
							<div className={Style.info__detail}>6B</div>
						</div>
						<div className={Style.fineprint}>
							<p>
								Boarding begins 24 hours before departure.Bring your identification documents for verification 
							</p>
							<p>This ticket is Non-refundable • raypd starliner pvt ltd</p>
						</div>
						<div className={Style.snack}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								// class="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						</div>
						<div className={Style.barcode}>
							<div className={Style.barcode__scan}></div>
							<div className={Style.barcode__id}>001256733</div>
						</div>
					</div>
					<div className={Style.ticket__side}>
						<div className={Style.logo}>
							<p>starliner 123D</p>
						</div>
						<div className={`${Style.info} ${Style["side-arrive"]}`}>
							<div className={Style.info__item}>Arrive</div>
							<div className={Style.info__detail}>Mars</div>
						</div>
						<div className={`${Style.info} ${Style["side-depart"]}`}>
							<div className={Style.info__item}>Depart</div>
							<div className={Style.info__detail}>KSC, Earth</div>
						</div>
						<div className={`${Style.info} ${Style["side-date"]}`}>
							<div className={Style.info__item}>Date</div>
							<div className={Style.info__detail}>1 Oct 2022</div>
						</div>
						<div className={`${Style.info} ${Style["side-time"]}`}>
							<div className={Style.info__item}>Time</div>
							<div className={Style.info__detail}>11:00AM</div>
						</div>
						<div className={Style.barcode}>
							<div className={Style.barcode__scan}></div>
							<div className={Style.barcode__id}>001256733</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Ticket;
