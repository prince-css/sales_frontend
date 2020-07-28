import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import jwt from "jsonwebtoken";
import "bootstrap/dist/css/bootstrap.css";
import Joi from "@hapi/joi";
import styles from "../css/in.module.css";
import logo from "../gimage/logo_pink.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { changeHandler, submitHandler } from "./form";
import { loginUser } from "./../services/loginService";
import { setJWT } from "../services/authService";

function Login(props) {
	const [data, setData] = useState({
		user: {
			email: "",
			password: "",
		},
		error: {},
	});
	const fetchedData = useContext(UserContext);
	const schemaBlueprint = {
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
		password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
	};
	const changeHandlerTop = (e) => {
		const newData = changeHandler(e, schemaBlueprint, data);
		setData(newData);
	};
	const submitHandlerTop = (e) => {
		const result = submitHandler(e, schemaBlueprint, data);
		doThis(result);
	};
	const doThis = async (result) => {
		if (result.error === undefined) {
			const newData = { ...data };
			try {
				const res = await loginUser(newData.user);
				const token = res.data;
				const isValidToken = jwt.verify(
					token,
					process.env.REACT_APP_SECRETKEY
				);
				//console.log(isValidToken);
				const decoded = jwt.decode(token);
				//console.log(decoded);
				setJWT("key2", token);
				//console.log(token);

				fetchedData.validUserHandler(decoded);

				props.history.replace("/user/account");
			} catch (error) {
				newData.error["server"] = error.response.data;
				setData(newData);
				console.log(error.response.status);
			}
		} else {
			//console.log(result);
			const newData = { ...data };
			newData.error = {};
			for (let i = 0; i < result.error.details.length; i++) {
				newData.error[result.error.details[i].path[0]] =
					result.error.details[i].message;
			}
			setData(newData);
			//console.log(newData);
		}
	};

	return (
		<div className={styles.in_bg}>
			<div
				className={
					window.matchMedia("(max-width: 768px)").matches
						? styles.in_form_container_mb
						: styles.in_form_container
				}
			>
				<div className={styles.logoSection}>
					<img
						src={logo}
						height="10%"
						width="10%"
						className={styles.in_logo}
						alt={"..."}
					/>
					<h1>Saleneum</h1>
				</div>
				<hr width="100%"></hr>
				<form
					className={styles.in_form}
					onSubmit={(e) => submitHandlerTop(e)}
				>
					<div className="form-group row">
						<label
							htmlFor="email"
							className="col-sm-2 col-form-label"
						>
							Email
						</label>
						<div className="col-sm-10">
							<input
								name="email"
								onChange={(e) => changeHandlerTop(e)}
								type="text"
								className="form-control"
								id="email"
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
					</div>
					<div className="form-group row">
						<label
							htmlFor="password"
							className="col-sm-2 col-form-label"
						>
							Password
						</label>
						<div className="col-sm-10">
							<input
								name="password"
								onChange={(e) => changeHandlerTop(e)}
								type="password"
								className="form-control"
								id="password"
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
					</div>
					{data.error.server && (
						<div className="alert alert-danger" role="alert">
							{data.error.server}
						</div>
					)}
					<div className={styles.in_btnBox}>
						<button
							className={`btn btn-primary ${styles.in_btn}`}
							type="submit"
						>
							Sign in
						</button>
						<Link
							className={`btn btn-primary ${styles.in_btn}`}
							to="/register"
							role="button"
						>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
