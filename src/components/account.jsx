import React, { useEffect } from "react";
import styles from "../css/account.module.css";
import dp from "../gimage/dp.svg";
import "bootstrap/dist/css/bootstrap.css";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";
import AreaChart from "./areaChart.jsx";
import BarChart from "./barChart";
function Account(props) {
	const fetchedData = useContext(UserContext);
	//console.log(fetchedData.user);
	useEffect(() => {
		fetchedData.loadUser();
		fetchedData.initialFetch();
		return () => {};
	}, []);

	return (
		<div
			className={
				window.matchMedia("(max-width:600px)").matches
					? styles.account_wrapper_mb
					: styles.account_wrapper
			}
		>
			<div className={styles.account_grid_element}>
				<div
					className={`card ${styles.account_card}`}
					//style={{ width: `18rem` }}
				>
					<div className="text-center">
						<img src={dp} className={styles.account_dp} />
					</div>
					<div className={`card-body ${styles.account_card_body}`}>
						<h5 className="card-title text-center">{`${fetchedData.user.firstName} ${fetchedData.user.lastName}`}</h5>
						<p className="card-text text-center">
							{`${fetchedData.user.designation},${fetchedData.user.territory}`}
						</p>
					</div>
					<ul className="list-group list-group-flush">
						<li className="list-group-item text-center">
							<button type="button" className="btn btn-danger">
								Message
							</button>
						</li>
						<li className="list-group-item text-center">
							{fetchedData.user.email}
						</li>
						<li className="list-group-item text-center">
							Cohinoor Chemical Co. Ltd.
						</li>
					</ul>
				</div>
			</div>

			<div className={styles.account_grid_element}>
				<div className={`card text-center ${styles.account_card}`}>
					{/* <AreaChart className={styles.account_bar}/> */}
					<BarChart className={styles.account_bar} />
				</div>
			</div>

			<div className={styles.account_grid_element}>
				<div
					className={`card text-center ${styles.account_card}`}
					//style={{ width: `18rem` }}
				>
					<ul className="list-group list-group-flush">
						<li className="list-group-item">Session</li>
						<li className="list-group-item">
							<button type="button" className="btn btn-danger">
								01-06-2020
							</button>
						</li>
						<li className="list-group-item">
							<button type="button" className="btn btn-danger">
								30-06-2020
							</button>
						</li>
					</ul>
				</div>
			</div>

			<div className={styles.account_grid_element}></div>
		</div>
	);
}

export default Account;
