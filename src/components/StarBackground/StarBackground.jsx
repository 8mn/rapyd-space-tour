import Style from "./StarBackground.module.scss"

const StarBackground = () => {
  return (
		<>
			<div className={Style.stars}></div>
			<div className={Style.twinkling}></div>
			<div className={Style.clouds}></div>
		</>
	);
}

export default StarBackground