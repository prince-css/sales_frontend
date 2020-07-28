import React from "react";
import hero from "../gimage/verify.svg";
import wave from "../gimage/wave.svg";
import styles from "../css/verifyPage.module.css";
import Navbar from "./navbar";
function VerifyPage(props) {
	return (
		<React.Fragment>
			<Navbar />
			<div>
				<div className={styles.hero_cover}>
					<svg
						viewBox="-100 -100 200 200"
						xmlns="http://www.w3.org/2000/svg"
						className={`${styles.bg_shapes} ${styles.shape1}`}
					>
						<path
							fill="#F9BF8F"
							d="M53.5,-71.8C68.2,-62.9,78.4,-45.8,79.6,-29C80.8,-12.1,73,4.5,65.1,18.8C57.2,33,49.2,44.9,38.3,52.4C27.5,59.9,13.7,63.1,-1.2,64.7C-16.1,66.3,-32.2,66.4,-43.3,59C-54.3,51.5,-60.3,36.5,-66.8,20.7C-73.3,4.9,-80.3,-11.7,-77.6,-26.9C-75,-42,-62.7,-55.7,-48.1,-64.7C-33.6,-73.7,-16.8,-78.1,1.3,-79.9C19.4,-81.6,38.7,-80.8,53.5,-71.8Z"
							// transform="translate(100 100)"
						/>
					</svg>
					<svg
						viewBox="-150 -150 300 300"
						xmlns="http://www.w3.org/2000/svg"
						className={`${styles.bg_shapes} ${styles.shape2}`}
					>
						<path
							fill="#F9BF8F"
							d="M43.7,-60.1C55.3,-51.8,62.5,-37.2,68.9,-21.4C75.3,-5.7,80.9,11.2,77.9,26.7C74.8,42.2,63,56.3,48.5,62C34.1,67.7,17.1,65,0.4,64.4C-16.2,63.8,-32.4,65.3,-41.9,58C-51.4,50.7,-54.2,34.6,-59.6,19.1C-64.9,3.6,-72.7,-11.3,-67.8,-20.8C-63,-30.3,-45.5,-34.4,-32.1,-42.1C-18.6,-49.8,-9.3,-61.1,3.4,-65.8C16.1,-70.4,32.1,-68.4,43.7,-60.1Z"
							//transform="translate(100 100)"
						/>
					</svg>
					<svg
						viewBox="-75 -75 150 150"
						xmlns="http://www.w3.org/2000/svg"
						className={`${styles.bg_shapes} ${styles.shape3}`}
					>
						<path
							fill="#F9BF8F"
							d="M69.4,-41.3C81.4,-19.3,76.6,11.1,62.3,28.9C47.9,46.6,24,51.8,-1.4,52.6C-26.7,53.4,-53.5,49.8,-61.3,35.8C-69.1,21.8,-58,-2.6,-44.6,-25.4C-31.2,-48.2,-15.6,-69.3,6.5,-73.1C28.7,-76.9,57.4,-63.3,69.4,-41.3Z"
							//transform="translate(100 100)"
						/>
					</svg>
					<div className={styles.content}>
						<img
							src={hero}
							className={styles.hero_img}
							alt="..."
						></img>
						<h3>Registration Completed !!!</h3>
						<p>
							<small>
								Please wait for your supervisor to verify your
								account
							</small>
						</p>
					</div>
				</div>
				<img src={wave} className={styles.wave_img} alt="..."></img>
			</div>
		</React.Fragment>
	);
}

export default VerifyPage;
