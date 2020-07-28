import React from "react";
import Joi from "@hapi/joi";
import styles from "../css/imsFormat.module.css";
import { useState, useEffect } from "react";
import {
	getProducts,
	updateProducts,
	addProducts,
} from "../services/productService";
import { changeHandler, submitHandler } from "./form";
import { useContext } from "react";
import { UserContext } from "./../contexts/userContext";

function ImsFormat(props) {
	const [error, setError] = useState("");
	const [newProducts, setNewProducts] = useState([]);
	const fetchedData = useContext(UserContext);
	const products = fetchedData.products;
	useEffect(() => {
		//console.log(products);
		//console.log(newProducts);
		return () => {};
	}, [newProducts]);
	const incHandler = () => {
		const new2Products = [...newProducts];
		const new2Product = {
			serial: "",
			productName: "",
			productCode: "",
			rate: "",
		};
		new2Products.push(new2Product);
		setNewProducts(new2Products);
	};

	const changeHandler = (e, i) => {
		const newProducts = [...products];
		newProducts[i][e.target.name] = e.target.value;
		fetchedData.productHandler(newProducts);
		//console.log(products);
	};
	const newChangeHandler = (e, i) => {
		const new2Products = [...newProducts];
		new2Products[i][e.target.name] = e.target.value;
		setNewProducts(new2Products);
	};
	const deleteHandler = (e, i) => {
		let new2Products = [...newProducts];
		new2Products.splice(i, 1);
		setNewProducts(new2Products);
	};

	const defaultBox = () => {
		//console.log(products);
		let count = products.length;
		let boxes = [];
		for (let i = 0; i < count; i++) {
			boxes.push(
				<tr className="text-center" key={`default--${i}`}>
					<th scope="row">
						<input
							type="number"
							className="form-control"
							id={`item-serial-${i}`}
							name="serial"
							value={products[i].serial}
							onChange={(e) => changeHandler(e, i)}
							readOnly={
								!fetchedData.selectedOption.changeOrder
									? true
									: false
							}
						/>
					</th>
					<th scope="row">
						<input
							type="text"
							className="form-control"
							id={`item-product-${i}`}
							name={`item-product-${i}`}
							value={products[i].productName}
							readOnly
						/>
					</th>
					<th scope="row">
						<input
							type="text"
							className="form-control"
							id={`item-code-${i}`}
							name={`item-code-${i}`}
							value={products[i].productCode}
							readOnly
						/>
					</th>
					<th scope="row">
						<input
							type="number"
							className="form-control"
							id={`item-rate-${i}`}
							name="rate"
							value={products[i].rate}
							onChange={(e) => changeHandler(e, i)}
							readOnly={
								!fetchedData.selectedOption.changeOrder
									? true
									: false
							}
						/>
					</th>
				</tr>
			);
		}
		return boxes;
	};
	const showBox = () => {
		let boxes = [];
		for (let i = 0; i < newProducts.length; i++) {
			boxes.push(
				<tr className="text-center" key={`new--${i}`}>
					<th scope="row">
						<input
							type="number"
							className="form-control"
							id={`item-serial-${i}`}
							name="serial"
							value={newProducts[i].serial || ""}
							onChange={(e) => {
								newChangeHandler(e, i);
							}}
						/>
					</th>
					<th scope="row">
						<input
							type="text"
							className="form-control"
							id={`item-product-${i}`}
							name="productName"
							value={newProducts[i].productName || ""}
							onChange={(e) => newChangeHandler(e, i)}
						/>
					</th>
					<th scope="row">
						<input
							type="text"
							className="form-control"
							id={`item-code-${i}`}
							name="productCode"
							value={newProducts[i].productCode || ""}
							onChange={(e) => newChangeHandler(e, i)}
						/>
					</th>
					<th scope="row">
						<input
							type="number"
							className="form-control"
							id={`item-rate-${i}`}
							name="rate"
							value={newProducts[i].rate || ""}
							onChange={(e) => newChangeHandler(e, i)}
						/>
					</th>
					<th scope="row">
						<button
							type="button"
							className="btn btn-danger"
							onClick={(e) => deleteHandler(e, i)}
						>
							Delete
						</button>
					</th>
				</tr>
			);
		}
		return boxes;
	};
	const indiSchema = Joi.object({
		serial: Joi.number().required().max(100).min(0).label("Serial"),
		productName: Joi.string()
			.required()
			.max(50)
			.min(1)
			.label("Product Name"),
		productCode: Joi.string().required().max(6).label("Product Code"),
		rate: Joi.number().required().max(500).min(1).label("Rate"),
	});
	const finalSchema = Joi.array().unique().label("Serial");
	const submitHandler = async (e) => {
		e.preventDefault();
		//console.log(products);
		let res = "";
		let result1 = { error: "" };
		let result2 = { error: "" };
		if (fetchedData.selectedOption.changeOrder) {
			const serialArr = [];
			for (let i = 0; i < products.length; i++) {
				const product = {
					serial: products[i].serial,
					productName: products[i].productName,
					productCode: products[i].productCode,
					rate: products[i].rate,
				};
				serialArr.push(parseInt(products[i].serial));
				result1 = indiSchema.validate(product, {
					abortEarly: true,
				});
				if (result1.error) {
					setError(result1.error.details[0].message);
					break;
				}
			}
			//console.log(serialArr);
			if (result1.error) return;

			result2 = finalSchema.validate(serialArr);
			if (result2.error) {
				setError(result2.error.details[0].message);
				return;
			}
			setError("");
			res = await updateProducts(products);
			//console.log("updateProduct");
			props.history.replace("/user/ims_format_options");
		} else if (fetchedData.selectedOption.addProduct) {
			const serialArr = [];
			for (let i = 0; i < products.length; i++) {
				serialArr.push(parseInt(products[i].serial));
			}
			for (let i = 0; i < newProducts.length; i++) {
				const newProduct = {
					serial: newProducts[i].serial,
					productName: newProducts[i].productName,
					productCode: newProducts[i].productCode,
					rate: newProducts[i].rate,
				};
				serialArr.push(parseInt(newProducts[i].serial));
				result1 = indiSchema.validate(newProduct, {
					abortEarly: true,
				});
				if (result1.error) {
					setError(result1.error.details[0].message);
					break;
				}
			}
			if (result1.error) return;

			//console.log(serialArr);
			result2 = finalSchema.validate(serialArr);
			if (result2.error) {
				setError(result2.error.details[0].message);
				return;
			}
			setError("");
			res = await addProducts(newProducts);
			//console.log("addProduct");
			props.history.replace("/user/ims_format_options");
		}
		console.log(res.error);
	};

	return (
		<div className={styles.imsFormat_wrapper}>
			{fetchedData.selectedOption.addProduct && (
				<div>
					<button
						onClick={incHandler}
						className={`${styles.countBtn} ${styles.btn1}`}
					>
						<h1>+</h1>
					</button>
				</div>
			)}
			<form onSubmit={(e) => submitHandler(e)}>
				<table
					className={`table table-bordered table-sm ${styles.ims_table}`}
				>
					<thead>
						<tr className="text-center">
							<th scope="col">Serial</th>
							<th scope="col">Name</th>
							<th scope="col">Code</th>
							<th scope="col">Rate</th>
						</tr>
					</thead>
					<tbody>
						{products ? defaultBox() : ""}
						{showBox()}
						<tr colSpan="4">
							<td>
								<input
									type="text"
									className="form-control"
									id="tvv"
									name="tvv"
									defaultValue={`TV`}
									readOnly
								/>
							</td>
						</tr>
					</tbody>
				</table>
				{error && (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				)}
				{!fetchedData.selectedOption.viewImsFormat &&
					!fetchedData.selectedOption.recentIms &&
					!fetchedData.selectedOption.newIms &&
					!fetchedData.selectedOption.updateIms && (
						<button
							type="submit"
							className={`btn btn-danger ${styles.format_btn}`}
							//onClick={clickHandler}
						>
							Save
						</button>
					)}
			</form>
		</div>
	);
}

export default ImsFormat;
