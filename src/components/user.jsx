import React from "react";
import Navbar from "./navbar.jsx";
import styles from "../css/user.module.css";
import Sidebar from "./sidebar.jsx";
import { Switch } from "react-router-dom";
import Account from "./account.jsx";
import MyIms from "./myIms.jsx";
import { useState } from "react";
import ImsFormat from "./imsFormat";
import ProductFormat from "./productFormat";
import ImsOptions from "./imsOptions";
import DateSelection from "./dateSelection";
import ImsOpts from "./imsOpts.jsx";
import GroupIms from "./groupIms";
import Subordinates from "./subordinates.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext.js";

function User(props) {
	const [mounted, setMounted] = useState(false);
	const fetchedData = useContext(UserContext);
	useEffect(() => {
		fetchedData.initialFetch();
		setMounted(true);
	}, []);
	return (
		<div className={styles.allWrapper}>
			{mounted && (
				<React.Fragment>
					<Navbar />
					<Sidebar />
					<div
						className={
							window.matchMedia("(max-width: 768px)").matches
								? styles.body_mb
								: styles.body
						}
					>
						<Switch>
							<ProtectedRoute
								path="/user/account"
								component={Account}
							/>
							<ProtectedRoute
								path="/user/subordinates"
								component={Subordinates}
							/>
							<ProtectedRoute
								path="/user/myims/ims"
								component={MyIms}
							/>
							<ProtectedRoute
								path="/user/srims/:id"
								component={MyIms}
							/>
							<ProtectedRoute
								path="/user/myims"
								component={DateSelection}
							/>
							<ProtectedRoute
								path="/user/ims_format"
								component={ImsFormat}
							/>
							<ProtectedRoute
								path="/user/ims_options"
								component={ImsOpts}
							/>
							<ProtectedRoute
								path="/user/ims_format_options"
								component={ImsOptions}
							/>
							<ProtectedRoute
								path="/user/product_format"
								component={ProductFormat}
							/>
							<ProtectedRoute
								path="/user/group_ims"
								component={GroupIms}
							/>
						</Switch>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default User;
