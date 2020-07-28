import React from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import styles from "../css/dateSelection.module.css";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";

function DateSelection(props) {
	const fetchedData = useContext(UserContext);

	const changeHandler = async (newDate) => {
		fetchedData.dateHandler(newDate);
		//ajax request //
		if (fetchedData.user.designation === "DSO") {
			fetchedData.loadSubmittedSR(newDate);
			props.history.replace("/user/group_ims");
		} else if (fetchedData.user.designation !== "DSO") {
			props.history.replace("/user/myims/ims");
		}
	};

	return (
		<div className={styles.calendar_wrapper}>
			<Calendar
				onChange={(value) => changeHandler(value)}
				className={styles.calendar}
			/>
		</div>
	);
}

export default DateSelection;
