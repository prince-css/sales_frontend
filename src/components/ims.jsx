import React from "react";
import styles from "../css/imsFormat.module.css";
import Joi from "@hapi/joi";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";
import { addSales, getSales } from "../services/productService";
import querystring from "querystring";
import { useRef } from "react";

function Ims(props) {
	//console.log(props.match.params);
	const fetchedData = useContext(UserContext);
	//console.log(fetchedData);
	const [rawIms, setRawIms] = useState({ date: "", user: "", ims: [] });
	let [bool, setBool] = useState(false);
	let [error, setError] = useState("");
	const loadIms = async (req, newIms) => {
		try {
			//Hitting the server with the query object and recentIms flag(header)
			const res = await getSales(
				req,
				fetchedData.selectedOption.recentIms
			);

			//storing the response
			const fetchedIms = { ...res.data };

			newIms.ims.map((formatProduct) => {
				fetchedIms.ims.map((fetchedProduct) => {
					if (fetchedProduct.product === formatProduct.product) {
						formatProduct.target = fetchedProduct.target;
						formatProduct.ach = fetchedProduct.ach;
						formatProduct.percent = fetchedProduct.percent;
						formatProduct.value = fetchedProduct.value;
						formatProduct.oldRate = fetchedProduct.oldRate;
					}
				});
			});

			// expanding the fetchedIMS upto the length of the format
			// for (
			// 	let i = res.data.ims.length;
			// 	i < fetchedData.products.length;
			// 	i++
			// ) {
			// 	fetchedIms.ims.push({
			// 		target: 0,
			// 		ach: 0,
			// 		percent: 0,
			// 		value: 0,
			// 		product: 0,
			// 		oldRate: 0,
			// 		product: "none",
			// 	});
			// }

			//saving "rawIms" state
			//setRawIms(fetchedIms);
			setRawIms(newIms);
			//console.log(res.data);
			//console.log(newIms);
			//return res.data;
		} catch (error) {
			return error;
		}
	};
	let totalVal = 0;
	const ref1 = useRef();
	const ref2 = useRef();
	const ref3 = useRef();
	const ref4 = useRef();
	let csvColumn = [
		{
			id: "msg",
			displayName: "IMS",
		},
	];
	let dummyCsvData = [];

	useEffect(() => {
		// If the user is an SR or a DSO visitting an SR's ims(via querystring)
		if (fetchedData.user.designation !== "DSO" || props.match.params.id) {
			const newIms = { ...rawIms };

			//getting user_id and date for querystring
			//which will be sent to the server for getting
			//the ims of that user of the pre-selected date
			newIms.date = fetchedData.date; //getting the pre-selected date
			newIms.user = fetchedData.user._id; //getting user_id

			//making qurystring object("req") for
			//requesting the server to give the ims of the preselected date.
			//user_id---->
			// If DSO is visitting SR's ims then
			//user_id will be set as the user_id which we got from the qs sent by DSO
			//or
			//if no qs was given means the user is an SR then his user_id will be set
			//date------->
			//converting "date object" to string
			const req = {
				user: props.match.params.id
					? props.match.params.id.trim()
					: newIms.user,
				date: fetchedData.date.toISOString(),
			};

			//populating the dummy variable newIms(rawIms) for safety
			//with something so that the app doesn't crash

			fetchedData.products.map((product) =>
				newIms.ims.push({
					target: 1,
					ach: 0,
					percent: 0,
					value: 0,
					oldRate: product.rate,
					product: product._id,
				})
			);

			//loading the ims of the preselected date using the "query object"(req)
			//if no IMS is found of the pre-selected date then server will send the most recent IMS(last IMS)
			try {
				loadIms(querystring.encode(req), newIms);
			} catch (error) {
				//if no recent or last IMS is found then store that dummy dewIms
				console.log(error.message);
				setRawIms(newIms);
			}
			//console.log(rawIms);
		}

		// esle If the user is DSO
		//for each product in the product format
		//summing up every ubmittedSR's IMS of that product
		else {
			const newRawIms = { ...rawIms };
			fetchedData.products.map((product) => {
				let newAch = 0;
				let newTarget = 0;
				let newPercent = 0;
				let newValue = 0;
				fetchedData.submittedSR.map((sr) => {
					sr.ims.map((srProduct) => {
						if (srProduct.product === product._id) {
							newTarget = newTarget + srProduct.target;
							newAch = newAch + srProduct.ach;
							//console.log(product.productCode, newAch);
							newValue = newValue + srProduct.value;
						}
					});
				});
				newRawIms.ims.push({
					target: newTarget > 0 ? newTarget : 1,
					ach: newAch,
					percent: !((newAch * 100) / newTarget)
						? newPercent
						: ((newAch * 100) / newTarget).toFixed(2),
					value: newValue,
					product: product._id,
					oldRate: product.rate,
				});
			});
			setRawIms(newRawIms);
		}
		setBool(true);
	}, []);

	const newChangeHandler = (e, i) => {
		const newIms = { ...rawIms };
		//console.log(e.target);

		newIms.ims[i][e.target.name] = e.target.value;

		if (newIms.ims[i].target && newIms.ims[i].ach) {
			const percent = (newIms.ims[i].ach / newIms.ims[i].target) * 100;
			newIms.ims[i].percent = percent.toFixed(2);
		}

		if (newIms.ims[i].ach) {
			newIms.ims[i].value =
				newIms.ims[i].ach * fetchedData.products[i].rate;
		}
		newIms.ims[i].product = fetchedData.products[i]._id;
		newIms.ims[i].oldRate = fetchedData.products[i].rate;
		setRawIms(newIms);
		//console.log(rawIms);
		//console.log(rawIms.ims[i].percent);
		//console.log(bool);
	};

	const valueHandler = (i, ref) => {
		//each product in the ims
		let value = "";

		//console.log(i);
		rawIms.ims.map((product) => {
			if (product.product === fetchedData.products[i]._id) {
				//console.log(ref.current);
				value = product[ref.current.name];
				//console.log("dekhi", value);
				if (ref === ref4) {
					totalVal = totalVal + parseFloat(value);
					//console.log(totalVal);
				} else if (ref === ref2) {
					dummyCsvData.push(
						`${fetchedData.products[i].productCode} > ${product.ach}`
					);
				}
			}
		});

		return bool ? value : "";
	};

	const showBox = () => {
		let boxes = [];
		totalVal = 0;
		for (let i = 0; i < fetchedData.products.length; i++) {
			//console.log(i);
			boxes.push(
				<tr key={fetchedData.products[i].productCode}>
					<td id="target">
						{/* {valueHandler(i, ref1)} */}

						{fetchedData.selectedOption.recentIms ? (
							<input
								type="number"
								className="form-control"
								id={`item-target-${i}`}
								name="target"
								ref={ref1}
								value={valueHandler(i, ref1)}
								readOnly
							/>
						) : (
							<input
								type="number"
								className="form-control"
								id={`item-target-${i}`}
								name="target"
								ref={ref1}
								defaultValue={valueHandler(i, ref1)}
								onChange={(e) => {
									newChangeHandler(e, i);
								}}
							/>
						)}
					</td>
					<td id="ach">
						{/* {valueHandler(i, ref2)} */}

						{fetchedData.selectedOption.recentIms ? (
							<input
								type="number"
								className="form-control"
								id={`item-ach-${i}`}
								name="ach"
								ref={ref2}
								value={valueHandler(i, ref2)}
								readOnly
							/>
						) : (
							<input
								type="number"
								className="form-control"
								id={`item-ach-${i}`}
								name="ach"
								ref={ref2}
								defaultValue={valueHandler(i, ref2)}
								onChange={(e) => {
									newChangeHandler(e, i);
								}}
							/>
						)}
					</td>
					<td id="percent">
						{/* {valueHandler(i, ref3)} */}

						<input
							type="number"
							className="form-control"
							id={`item-%-${i}`}
							name="percent"
							ref={ref3}
							defaultValue={valueHandler(i, ref3)}
							readOnly
						/>
					</td>
					<td id="value">
						{/* {valueHandler(i, ref4)} */}

						<input
							type="number"
							className="form-control"
							id={`item-value-${i}`}
							name="value"
							ref={ref4}
							defaultValue={valueHandler(i, ref4)}
							readOnly
						/>
					</td>
				</tr>
			);
		}
		//console.log(dummyCsvData);

		return boxes;
	};
	const validate = (arrOfObj) => {
		const objSchema = Joi.object({
			target: Joi.number().required().min(1),
			ach: Joi.number().required().min(0),
			percent: Joi.number().required().min(0),
			value: Joi.number().required().min(0),
			oldRate: Joi.number().required(),
			product: Joi.string().required(),
		});
		const arrOfObjSchema = Joi.array().items(objSchema);
		const result = arrOfObjSchema.validate(arrOfObj);
		return result;
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		const newIms = { ...rawIms };
		newIms.date = fetchedData.date;
		newIms.user = props.match.params.id
			? props.match.params.id.trim()
			: fetchedData.user._id;
		newIms._id ? delete newIms._id : void 0;
		newIms.__v ? delete newIms.__v : void 0;
		//console.log(newIms);
		const result = validate(newIms.ims);
		if (!result.error) {
			const res = await addSales(newIms);
			//console.log(res);
			props.history.replace("/user/ims_options");
		} else {
			setError(result.error.details[0].message);
			console.log(result.error);
		}
	};

	const csvHandler = (e) => {
		e.preventDefault();
		let csvContent = "";
		dummyCsvData.map((cell) => {
			csvContent += cell + "\r\n";
		});
		//console.log(csvContent);
		var link = document.createElement("a");
		const url = window.URL.createObjectURL(
			new Blob([csvContent], {
				type: "text/csv",
			})
		);
		link.setAttribute("href", url);
		link.setAttribute("download", `ims--${fetchedData.date}.csv`);
		document.body.appendChild(link);
		link.click();
	};

	return (
		<div className={styles.imsFormat_wrapper}>
			<form onSubmit={(e) => submitHandler(e)}>
				<table
					className={`table table-bordered table-sm ${styles.ims_table}`}
				>
					<thead>
						<tr>
							<th scope="col">Target</th>
							<th scope="col">Ach</th>
							<th scope="col">%</th>
							<th scope="col">Value</th>
						</tr>
					</thead>
					<tbody>
						{showBox()}
						<tr colSpan="4">
							<td>
								<input
									type="number"
									className="form-control"
									id="tv"
									name="tv"
									value={totalVal}
									readOnly
								/>
							</td>
						</tr>
					</tbody>
				</table>
				{!fetchedData.selectedOption.recentIms && (
					<React.Fragment>
						{error && (
							<div class="alert alert-danger" role="alert">
								{error}
							</div>
						)}
						<button type="submit" className="btn btn-danger">
							Save
						</button>
					</React.Fragment>
				)}
				{fetchedData.selectedOption.recentIms && (
					<button
						onClick={(e) => csvHandler(e)}
						className="btn btn-danger"
					>
						Download
					</button>
				)}
			</form>
		</div>
	);
}

export default Ims;
