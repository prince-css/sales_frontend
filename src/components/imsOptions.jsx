import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSort, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/imsOptions.module.css";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";

function ImsOptions(props) {
	const fetchedData = useContext(UserContext);
	const clickHandler = (e) => {
		//console.log(e.target);
		fetchedData.setOption(e);
		props.history.replace("/user/ims_format");
	};

	return (
		<div
			className={
				window.matchMedia("(max-width:600px)").matches
					? styles.optionsWrapper_mb
					: styles.optionsWrapper
			}
		>
			<div className="card-deck">
				<div
					className={`card ${styles.option_card}`}
					data-name="viewImsFormat"
					onClick={(e) => {
						clickHandler(e);
					}}
				>
					<div
						className="card-body text-center"
						data-name="viewImsFormat"
					>
						<div className={styles.cover} data-name="viewImsFormat">
							<FontAwesomeIcon icon={faEye} size="6x" />
							<h5 className="card-title">Current Format</h5>
							<p className="card-text">
								Click to view the current format.
							</p>
						</div>
					</div>
				</div>
				<div
					className={`card ${styles.option_card}`}
					data-name="changeOrder"
					onClick={(e) => clickHandler(e)}
				>
					<div
						className="card-body text-center"
						data-name="changeOrder"
					>
						<div className={styles.cover} data-name="changeOrder">
							<FontAwesomeIcon icon={faSort} size="6x" />
							<h5 className="card-title">Change Order</h5>
							<p className="card-text">
								Click to change the current order.
							</p>
						</div>
					</div>
				</div>
				<div
					className={`card ${styles.option_card}`}
					data-name="addProduct"
					onClick={(e) => clickHandler(e)}
				>
					<div
						className="card-body text-center"
						data-name="addProduct"
					>
						<div className={styles.cover} data-name="addProduct">
							<FontAwesomeIcon icon={faPlusCircle} size="6x" />
							<h5 className="card-title">Add New product</h5>
							<p className="card-text">
								Click to add new products.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImsOptions;
