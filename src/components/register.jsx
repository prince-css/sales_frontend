import React, { useContext, useState } from "react";
import Joi from "@hapi/joi";
import styles from "../css/in.module.css";
import { UserContext } from "../contexts/userContext";
import { registerUser } from "../services/registrationService";
import { changeHandler, submitHandler } from "./form.jsx";
function Register(props) {
	const { device } = useContext(UserContext);
	const [data, setData] = useState({
		user: {
			firstName: "",
			lastName: "",
			email: "",
			mobile: "",
			password: "",
			confirmPassword: "",
			designation: "",
			region: "",
			area: "",
			territory: "",
		},
		error: {},
	});

	// defining the schema of the registration form in plain vanilla JS format
	const schemaBlueprint = {
		firstName: Joi.string().max(15).min(2).required(),
		lastName: Joi.string().max(15).min(2).required(),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
		mobile: Joi.string().max(13).min(11).required(),
		password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
		confirmPassword: Joi.any().valid(Joi.ref("password")).required(),
		designation: Joi.string().required(),
		region: Joi.string().max(15).min(2).required(),
		area: Joi.string().max(15).min(2).required(),
		territory: Joi.string().max(15).min(2).required(),
	};

	let changeHandlerTop = (e) => {
		const newData = changeHandler(e, schemaBlueprint, data);
		setData(newData);
	};

	let doThis = async (result) => {
		// if all the inputs are valid
		if (result.error === undefined) {
			//console.log(result);
			// copying the state (only value withot error) in a temporary object
			const dataToSave = { ...data.user };
			// deleting confirmPassword because the validation is over
			delete dataToSave.confirmPassword;
			try {
				// sending the data to database to save
				// in return database will send a key to stay logged in
				const res = await registerUser(dataToSave);
				//console.log(res);
				//storing the key in browser's local storage
				//window.localStorage.setItem("key", res.data);

				//redirecting user to his account
				props.history.replace("/verify");
			} catch (error) {
				const newData = { ...data };
				newData.error["server"] = error.response.data;
				console.log(error.response.data);
				setData(newData);
			}
		}
		//if some or all of the input are invalid
		else {
			// copying the state (with error) in a temporary object
			const newData = { ...data };
			// everytime refreshing "error" property to save new errors
			// because new errors can occur in fewer places than previous
			// if so then previous errors have to be cleared out
			newData.error = {};
			for (let i = 0; i < result.error.details.length; i++) {
				newData.error[result.error.details[i].path[0]] =
					result.error.details[i].message;
			}
			//saving errors in the state
			setData(newData);
			//console.log(newData);
		}
	};
	let submitHandlerTop = (e) => {
		const result = submitHandler(e, schemaBlueprint, data);
		doThis(result);
	};
	// // validating all the fields at once while submitting the form
	// let validate = (obj) => {
	// 	//assigning "schemaBlueprint"'s  properties in Joi.object
	// 	const userSchema = Joi.object(schemaBlueprint).with(
	// 		"password",
	// 		"confirmPassword"
	// 	);
	// 	const result = userSchema.validate(obj, { abortEarly: false });
	// 	return result;
	// };

	// //validating each field while inputting the value
	// let validateProperty = (e) => {
	// 	// avoiding "confirmPassword" field to be validated while inputting
	// 	// because it needs "password" field as a reference
	// 	//////////// HAVE TO WORK ON IT LATER ///////////////

	// 	if(e.target.name==="confirmPassword"){
	// 		const result={value:"",error:undefined};
	// 		return result;
	// 	}

	// 	// making an object of the individual input field(property)
	// 	const propertyToCheck = {};
	// 	propertyToCheck[e.target.name] = e.target.value;

	// 	// making an schema which has only one property
	// 	// taken from "schemaBlueprint"
	// 	const property = {};
	// 	property[e.target.name] = schemaBlueprint[e.target.name];
	// 	let propertySchema = Joi.object(property);

	// 	//validating that property by newly created schema
	// 	const result = propertySchema.validate(propertyToCheck);
	// 	return result;
	// };

	// // merging input field state with component state
	// // meanwhile validating each input by calling "validateProperty"
	// // the function is called whenever any change is observed in the input field
	// let changeHandler = (e) => {
	// 	// copying the state in new variable
	// 	// one shouldn't manipulate the state directly
	// 	let newData = { ...data };
	// 	console.log(newData);

	// 	// calling "validateProperty" function to
	// 	// validate that specific input field(property)
	// 	const result = validateProperty(e);

	// 	//if the input is valid...
	// 	if (result.error === undefined) {
	// 		//saving the input data in a temporary object
	// 		newData.user[e.target.name] = e.target.value;
	// 		newData.error[e.target.name] = "";

	// 		//saving the data in the state
	// 		setData(newData);
	// 	}
	// 	// if the input is not valid...
	// 	else {
	// 		newData.error[e.target.name] = result.error.details[0].message;
	// 		setData(newData);
	// 	}
	// };

	// // submitting the form (saving into database)
	// // after validating all the input at once by calling "validate"
	// // the function is called when "submit" button is pressed
	// let submitHandler = async (e) => {
	// 	//preventing the database call
	// 	e.preventDefault();
	// 	//console.log(data);

	// 	// validating all the data in the state at once
	// 	const result = validate(data.user);
	// 	console.log(result.error);

	// 	// if all the inputs are valid
	// 	if (result.error === undefined) {
	// 		// copying the state (only value withot error) in a temporary object
	// 		const dataToSave = { ...data.user };
	// 		// deleting confirmPassword because the validation is over
	// 		delete dataToSave.confirmPassword;
	// 		console.log(dataToSave);
	// 		// sending the data to database to save
	// 		// in return database will send a key to stay logged in
	// 		const res = await registerUser(dataToSave);

	// 		//storing the key in browser's local storage
	// 		window.localStorage.setItem("key", res.data);

	// 		//redirecting user to his account
	// 		props.history.replace("/user");
	// 	}
	// 	//if some or all of the input are invalid
	// 	else {
	// 		// copying the state (with error) in a temporary object
	// 		const newData = { ...data };
	// 		// everytime refreshing "error" property to save new errors
	// 		// because new errors can occur in fewer places than previous
	// 		// if so then previous errors have to be cleared out
	// 		newData.error = {};
	// 		for (let i = 0; i < result.error.details.length; i++) {
	// 			newData.error[result.error.details[i].path[0]] =
	// 				result.error.details[i].message;
	// 		}
	// 		//saving errors in the state
	// 		setData(newData);
	// 		//console.log(newData);
	// 	}
	// };

	// JSX which have to be rendered...
	return (
		<div className={styles.in_bg}>
			<div
				className={
					window.matchMedia("(max-width: 768px)").matches
						? `${styles.in_form_container_mb} ${styles.reg_form_extra}`
						: styles.in_form_container
				}
			>
				<form
					onSubmit={(e) => submitHandlerTop(e)}
					className={styles.in_form}
				>
					<div className="form-row">
						<div className="col-md-6 mb-3">
							<label htmlFor="firstName">First name</label>
							<input
								onChange={(e) => {
									return changeHandlerTop(e);
								}}
								name="firstName"
								type="text"
								className="form-control"
								id="firstName"
								placeholder="Mark"
								// required
							/>
							{console.log("achi")}
							{data.error.firstName && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.firstName}
								</div>
							)}
						</div>
						<div className="col-md-6 mb-3">
							<label htmlFor="lastName">Last name</label>
							<input
								onChange={(e) => {
									return changeHandlerTop(e);
								}}
								name="lastName"
								type="text"
								className="form-control"
								id="lastName"
								placeholder="Otto"
								// required
							/>
							{data.error.lastName && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.lastName}
								</div>
							)}
						</div>
					</div>

					<div className="form-row">
						<div className="col-md-6 mb-3">
							<label htmlFor="email">Email</label>
							<input
								onChange={(e) => {
									return changeHandlerTop(e);
								}}
								name="email"
								type="email"
								className="form-control"
								id="email"
								placeholder="username@domain.com"
								// required
							/>
							{data.error.email && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.email}
								</div>
							)}
						</div>
						<div className="col-md-6 mb-3">
							<label htmlFor="mobile">Mobile No.</label>
							<input
								onChange={(e) => {
									return changeHandlerTop(e);
								}}
								name="mobile"
								type="number"
								className="form-control"
								id="mobile"
								placeholder="+8801XXXXXX"
								// required
							/>
							{data.error.mobile && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.mobile}
								</div>
							)}
						</div>
					</div>

					<div className="form-row">
						<div className="col-md-6 mb-3">
							<label htmlFor="password">Password</label>
							<input
								onChange={(e) => {
									return changeHandlerTop(e);
								}}
								name="password"
								type="password"
								className="form-control"
								id="password"
								placeholder=""
								// required
							/>
							{data.error.password && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.password}
								</div>
							)}
						</div>
						<div className="col-md-6 mb-3">
							<label htmlFor="confirmPassword">
								Confirm Password
							</label>
							<input
								onChange={(e) => {
									return changeHandlerTop(e);
								}}
								name="confirmPassword"
								type="password"
								className="form-control"
								id="confirmPassword"
								placeholder=""
								// required
							/>
							{data.error.confirmPassword && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.confirmPassword}
								</div>
							)}
						</div>
					</div>

					<div className="form-row">
						<div className="col-md-3 mb-3">
							<label htmlFor="designation">Designation</label>
							<select
								onChange={(e) => {
									return changeHandlerTop(e);
								}}
								name="designation"
								className="form-control"
								id="designation"
							>
								<option>--</option>
								<option>SR</option>
								<option>SSR</option>
								<option>ADSO</option>
								<option>DSO</option>
								<option>RM</option>
							</select>
							{data.error.designation && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.designation}
								</div>
							)}
						</div>
						<div className="col-md-3 mb-3">
							<label htmlFor="region">Region</label>
							<input
								onChange={(e) => changeHandlerTop(e)}
								name="region"
								type="text"
								className="form-control"
								id="region"
								// required
							/>
							{data.error.region && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.region}
								</div>
							)}
						</div>
						<div className="col-md-3 mb-3">
							<label htmlFor="area">Area</label>
							<input
								onChange={(e) => changeHandlerTop(e)}
								name="area"
								type="text"
								className="form-control"
								id="area"
								// required
							/>
							{data.error.area && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.area}
								</div>
							)}
						</div>
						<div className="col-md-3 mb-3">
							<label htmlFor="territory">Territory</label>
							<input
								onChange={(e) => changeHandlerTop(e)}
								name="territory"
								type="text"
								className="form-control"
								id="territory"
								// required
							/>
							{data.error.territory && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{data.error.territory}
								</div>
							)}
						</div>
					</div>
					{data.error.server && (
						<div className="alert alert-danger" role="alert">
							{data.error.server}
						</div>
					)}
					<button
						className={`btn btn-primary ${styles.in_btn}`}
						type="submit"
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
