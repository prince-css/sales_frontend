import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCogs,
	faSignOutAlt,
	faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";

function Navbar(props) {
	const fetchedData = useContext(UserContext);
	return (
		<div className={styles.topnav_wrapper}>
			<div className={styles.topnav}>
				{window.matchMedia("(max-width: 768px)").matches && (
					<li
						onClick={(e) => fetchedData.sidebarHandler()}
						data-name="sidebar"
					>
						<FontAwesomeIcon
							icon={faBars}
							size="2x"
							data-name="sidebar"
						/>
					</li>
				)}
				<NavLink to="#">
					<FontAwesomeIcon icon={faCogs} size="2x" />
				</NavLink>
				<NavLink to="/logout">
					<FontAwesomeIcon icon={faSignOutAlt} size="2x" />
				</NavLink>
			</div>
		</div>
	);
}

export default Navbar;
