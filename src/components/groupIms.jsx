import React from "react";
import styles from "../css/groupIms.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";
import dp from "../gimage/dp.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function GroupIms(props) {
	let count = 0;
	const fetchedData = useContext(UserContext);
	useEffect(() => {
		try {
			//const qs = { date: toISOString(newDate) };
			//const res=await getSR(querystring.encode(qs));
		} catch (error) {
			console.log(error.message);
		}
	}, []);
	const clickHandler = (e, sr) => {
		props.history.replace(`/user/srims/ ${sr._id}`);
	};

	const loadSR = () => {
		const card = [];
		console.log(fetchedData.srNumber.length);
		fetchedData.srNumber.map((sr) => {
			let isSubmitted = false;
			fetchedData.submittedSR.map((subSR) => {
				if (subSR.user._id === sr._id) {
					isSubmitted = true;
					//console.log(isSubmitted);

					count++;
				}
			});
			card.push(
				<div
					key={`card--${sr._id + 1967}`}
					className={
						isSubmitted
							? `card ${
									window.matchMedia("(max-width:600px)")
										.matches
										? styles.groupIms_card_mb
										: styles.groupIms_card
							  }`
							: `card ${
									window.matchMedia("(max-width:600px)")
										.matches
										? styles.groupIms_disabled_card_mb
										: styles.groupIms_disabled_card
							  }`
					}
					onClick={(e) => clickHandler(e, sr)}
				>
					<img src={dp} className="card-img-top" alt="..." />
					<div className="card-body">
						<h5 className="card-title">{`${sr.firstName} ${sr.lastName}`}</h5>
						<p className="card-text">{sr.territory}</p>
					</div>
					<div className="card-footer">
						<small className="text-muted">
							Last updated 3 mins ago
						</small>
					</div>
				</div>
			);
		});
		console.log(fetchedData.srNumber, fetchedData.submittedSR);
		return card;
	};

	return (
		<div className={styles.groupIms_wrapper}>
			<div className={`${styles.groupIms_cardBundle}`}>{loadSR()}</div>
			<br></br>
			<Link
				to="/user/myims/ims"
				className={
					count === fetchedData.srNumber.length
						? "btn btn-danger btn-lg"
						: "btn btn-danger btn-lg disabled"
				}
				role="button"
			>
				Generate DSO's IMS
			</Link>
			<br></br>
		</div>
	);
}

export default GroupIms;
