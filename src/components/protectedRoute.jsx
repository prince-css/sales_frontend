import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
	const { path, component: Component, render } = props;
	const fetchedData = useContext(UserContext);
	//console.log(fetchedData.user);
	return (
		<Route
			path={path}
			render={(props) => {
				return fetchedData.validUser._id &&
					fetchedData.validUser.isApproved ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
}

export default ProtectedRoute;
