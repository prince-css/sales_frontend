import React from "react";
import styles from "../css/subordinates.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckSquare,
	faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { getSR } from "../services/userService";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";
function Subordinates(props) {
	const fetchedData = useContext(UserContext);
	useEffect(() => {}, []);

	const showBox = () => {
		let boxes = [];
		for (let i = 0; i < fetchedData.allSRNumber.length; i++) {
			boxes.push(
				<tr key={i}>
					<td
						className={`${styles.sub_table_td} ${styles.sub_table_name}`}
					>
						{`${fetchedData.allSRNumber[i].firstName} ${fetchedData.allSRNumber[i].lastName}`}
					</td>
					<td className={styles.sub_table_td}>
						<FontAwesomeIcon
							icon={faCheckSquare}
							size="2x"
							color="green"
							className={
								fetchedData.allSRNumber[i].isApproved
									? styles.sub_disabled
									: styles.sub_enabled
							}
							onClick={() =>
								fetchedData.approveHandler(
									fetchedData.allSRNumber[i]._id,
									{ isApproved: true }
								)
							}
						/>
					</td>
					<td className={styles.sub_table_td}>
						<FontAwesomeIcon
							icon={faTimesCircle}
							size="2x"
							color="red"
							className={
								fetchedData.allSRNumber[i].isApproved
									? styles.sub_disabled
									: styles.sub_enabled
							}
							onClick={() =>
								fetchedData.deleteUserHandler(
									fetchedData.allSRNumber[i]._id
								)
							}
						/>
					</td>
				</tr>
			);
		}
		//console.log(boxes);
		return boxes;
	};

	return (
		<div className={styles.sub_wrapper}>
			<table>
				<tbody>{showBox()}</tbody>
			</table>
		</div>
	);
}

export default Subordinates;
