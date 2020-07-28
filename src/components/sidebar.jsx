import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserCircle,
	faTable,
	faDatabase,
	faAngleDown,
	faTasks,
	faCheckSquare,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../css/sidebar.module.css";
import logo from "../gimage/logo_pink.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";

function Sidebar(props) {
	//const [selected,setSelected]=useState();
	const fetchedData = useContext(UserContext);
	const dropdownRef = React.createRef();
	let dropdownBtnClass = styles.sidebar_li;

	const dropdownHandler = (e) => {
		if (dropdownRef.current.style.display === "") {
			dropdownRef.current.style.display = "block";
			dropdownBtnClass = `${styles.sidebar_li} ${styles.active}`;
		} else {
			dropdownRef.current.style.display = "";
			dropdownBtnClass = styles.sidebar_li;
		}
	};

	const showSidebar = () => {
		let style = "";
		if (
			window.matchMedia("(max-width: 768px)").matches &&
			fetchedData.sidebar
		) {
			//console.log("sidebar mobile-a ache");
			style = styles.sidebar_container_mb;
		} else if (!window.matchMedia("(max-width: 768px)").matches) {
			//console.log("sidebar ache");
			style = styles.sidebar_container;
		} else {
			//console.log("sidebar nai");
			style = styles.sidebar_container_hide;
		}
		return style;
	};

	return (
		<div className={showSidebar()}>
			<img
				src={logo}
				height="200rem"
				width="200rem"
				className={styles.side_img}
			/>
			<ul className={styles.sidebar_ul}>
				<li
					className={
						fetchedData.selectedOption.home
							? styles.sidebar_li_selected
							: styles.sidebar_li
					}
				>
					<Link
						to="/user/account"
						data-name="home"
						onClick={(e) => {
							fetchedData.sidebarHandler();
							fetchedData.setOption(e);
						}}
					>
						<FontAwesomeIcon icon={faUserCircle} size="1x" />
						<span className={styles.list_text} data-name="home">
							Home
						</span>
					</Link>
				</li>

				{fetchedData.user.designation == "DSO" && (
					<React.Fragment>
						<li
							className={
								fetchedData.selectedOption.subordinates
									? styles.sidebar_li_selected
									: styles.sidebar_li
							}
						>
							<Link
								to="/user/subordinates"
								data-name="subordinates"
								onClick={(e) => {
									fetchedData.sidebarHandler();
									fetchedData.setOption(e);
								}}
							>
								<FontAwesomeIcon icon={faUsers} size="1x" />
								<span
									className={styles.list_text}
									data-name="subordinates"
								>
									Subordinates
								</span>
							</Link>
						</li>
						<li
							className={dropdownBtnClass}
							onClick={(e) => dropdownHandler(e)}
						>
							<FontAwesomeIcon icon={faTasks} size="1x" />
							<span className={styles.list_text}>
								Format
								<span className={styles.list_text}>
									<FontAwesomeIcon
										icon={faAngleDown}
										size="1x"
									/>
								</span>
							</span>
						</li>
					</React.Fragment>
				)}
				{/*/////////////////////////////// dropdown //////////////////////////////*/}
				<div className={styles.dropdown_container} ref={dropdownRef}>
					<li
						className={
							fetchedData.selectedOption.imsFormat
								? styles.dropdown_li_selected
								: styles.dropdown_li
						}
					>
						<Link
							to="/user/ims_format_options"
							data-name="imsFormat"
							onClick={(e) => {
								fetchedData.sidebarHandler();
								fetchedData.setOption(e);
							}}
						>
							Daily IMS
						</Link>
					</li>
					<li
						className={
							fetchedData.selectedOption.productFormat
								? styles.dropdown_li_selected
								: styles.dropdown_li
						}
					>
						<Link
							to="/user/product_format"
							data-name="productFormat"
							onClick={(e) => {
								fetchedData.sidebarHandler();
								fetchedData.setOption(e);
							}}
						>
							Product Sheet
						</Link>
					</li>
				</div>

				<li
					className={
						fetchedData.selectedOption.myIms
							? styles.sidebar_li_selected
							: styles.sidebar_li
					}
				>
					<Link
						to="/user/ims_options"
						data-name="myIms"
						onClick={(e) => {
							fetchedData.sidebarHandler();
							fetchedData.setOption(e);
						}}
					>
						<FontAwesomeIcon icon={faTable} size="1x" />
						<span className={styles.list_text} data-name="myIms">
							My IMS
						</span>
					</Link>
				</li>
				{/* {fetchedData.user.designation != "DSO" && (
					<li className={styles.sidebar_li}>
						<Link to="/user/group_ims">Group IMS</Link>
					</li>
				)} */}

				<li
					className={
						fetchedData.selectedOption.stock
							? styles.sidebar_li_selected
							: styles.sidebar_li
					}
				>
					<FontAwesomeIcon icon={faDatabase} size="1x" />
					<span className={styles.list_text} data-name="myIms">
						Stock
					</span>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
