import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "../css/myIms.module.css";
import { useEffect } from "react";
import ImsFormat from "./imsFormat";
import Ims from "./ims";

export default function MyIms(props) {
	useEffect(() => {}, []);

	return (
		<div
			className={
				window.matchMedia("(max-width:600px)").matches
					? styles.ims_wrapper_mb
					: styles.ims_wrapper
			}
		>
			{/* <div className={`${styles.col_div}`}>
				<ImsFormat />
			</div> */}
			<ImsFormat />
			<Ims history={props.history} match={props.match} />
			{/* <div className={`${styles.col_div}`}>
				<Ims history={props.history} match={props.match} />
			</div> */}
		</div>
	);
}
