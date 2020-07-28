import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/imsOptions.module.css";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";
function ImsOpts(props) {
	const fetchedData = useContext(UserContext);
	const clickHandler = (e) => {
		//console.log(e.target);
		fetchedData.setOption(e);
		props.history.replace("/user/myIms");
	};

	return (
		<div className={styles.optionsWrapper}>
			<div className="card-deck">
				<div
					className={`card ${styles.option_card}`}
					data-name="recentIms"
					onClick={(e) => {
						clickHandler(e);
					}}
				>
					<div
						className="card-body text-center"
						data-name="recentIms"
					>
						<div className={styles.cover} data-name="recentIms">
							<FontAwesomeIcon icon={faHistory} size="6x" />
							<h5 className="card-title">Recent IMS</h5>
							<p className="card-text">
								Click to view any recent IMS.
							</p>
						</div>
					</div>
				</div>

				<div
					className={`card ${styles.option_card}`}
					data-name="newIms"
					onClick={(e) => clickHandler(e)}
				>
					<div className="card-body text-center" data-name="newIms">
						<div className={styles.cover} data-name="newIms">
							<FontAwesomeIcon icon={faPlusCircle} size="6x" />
							<h5 className="card-title">New IMS</h5>
							<p className="card-text">Click to add new IMS.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImsOpts;
