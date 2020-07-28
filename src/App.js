import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/login.jsx";
import Register from "./components/register.jsx";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import User from "./components/user";
import VerifyPage from "./components/verifyPage";
import {
	getUser,
	getSR,
	approveUser,
	deleteUser,
	getAllSR,
} from "./services/userService";
import {
	getProducts,
	getSales,
	getSubmittedSR,
} from "./services/productService";

import querystring from "querystring";
import ProtectedRoute from "./components/protectedRoute";
import Logout from "./components/logout";
import NotFound from "./components/notFound";

function App() {
	const [date, setDate] = useState();
	const [sidebar, setSidebar] = useState(false);
	const [validUser, setValidUser] = useState("");
	const [user, setUser] = useState({
		_id: "",
		isApproved: "",
		firstName: "",
		lastName: "",
		mobile: "",
		email: "",
		designation: "",
		area: "",
		territory: "",
	});
	const [selectedOption, setSelectedOption] = useState({
		home: true,
		imsFormat: false,
		viewImsFormat: false,
		addProduct: false,
		changeOrder: false,
		productFormat: false,
		subordinates: false,
		myIms: false,
		recentIms: false,
		updateIms: false,
		newIms: false,
		groupIms: false,
		stock: false,
	});
	const [products, setProducts] = useState();
	const [lastIms, setLastIms] = useState();
	const [allSRNumber, setAllSRNumber] = useState(1);
	const [srNumber, setSRNumber] = useState(1);
	const [submittedSR, setSubmittedSR] = useState([]);

	useEffect(() => {
		//initialFetch();
		//console.log(selectedOption);
		//console.log(date);

		return () => {};
	}, [selectedOption, date]);

	const loadLastIms = async (qs, header1, header2) => {
		try {
			const res = { ...(await getSales(qs, header1, header2)) };
			//console.log(res.data);
			setLastIms(res.data);
		} catch (error) {
			console.log(error.message);
		}
	};
	const validUserHandler = (decoded) => {
		setValidUser(decoded);
	};
	const loadUser = async () => {
		const user = await getUser(validUser._id);
		setUser(user.data);
		//console.log(user);
		const today = new Date();
		//console.log(today);
		if (user.data._id) {
			const qsObj = {
				user: user.data._id,
				date: today.toISOString(),
			};
			loadLastIms(querystring.encode(qsObj), false, true);
		}
	};

	const initialFetch = async () => {
		const fetchedProducts = {
			...(await getProducts()),
		};
		//console.log(fetchedProducts.data);
		setProducts(fetchedProducts.data);
		const fetchSRNumber = await getSR();
		setSRNumber(fetchSRNumber.data);
		//console.log(srNumber);
		const fetchAllSRNumber = await getAllSR(
			querystring.encode({ all: true })
		);
		setAllSRNumber(fetchAllSRNumber.data);
		//console.log(allSRNumber);
	};

	const setOption = (e) => {
		const name = e.target.getAttribute("data-name");
		//console.log(name);
		const updatedOption = { ...selectedOption };
		for (let i in updatedOption) {
			updatedOption[i] = false;
		}
		updatedOption[name] = true;
		setSelectedOption(updatedOption);

		//console.log(selectedOption);  //doesn't update instantaneously.
		//So, calling inside useEffect()
	};

	const dateHandler = (date) => {
		setDate(date);
	};
	const productHandler = (newProducts) => {
		setProducts(newProducts);
	};

	const loadSubmittedSR = async (newDate) => {
		const fetchSubmittedSR = await getSubmittedSR(
			querystring.encode({ date: newDate.toISOString() })
		);
		//console.log(fetchSubmittedSR.data);
		setSubmittedSR(fetchSubmittedSR.data);
	};

	const sidebarHandler = () => {
		setSidebar(!sidebar);
		//console.log(sidebar);
	};

	const approveHandler = async (id, isApproved) => {
		const userDekha = await approveUser(id, isApproved);
		//console.log(userDekha);
		const fetchAllSRNumber = await getAllSR(
			querystring.encode({ all: true })
		);
		setAllSRNumber(fetchAllSRNumber.data);
		const fetchSRNumber = await getSR();
		setSRNumber(fetchSRNumber.data);
	};
	const deleteUserHandler = async (id) => {
		const res = await deleteUser(id);
		//console.log(res);
		const fetchAllSRNumber = await getAllSR(
			querystring.encode({ all: true })
		);
		setAllSRNumber(fetchAllSRNumber.data);
		const fetchSRNumber = await getSR();
		setSRNumber(fetchSRNumber.data);
	};

	return (
		<div>
			<UserContext.Provider
				value={{
					date: date,

					sidebar: sidebar,
					validUser: validUser,
					user: user,
					selectedOption: selectedOption,
					products: products,
					lastIms: lastIms,
					allSRNumber: allSRNumber,
					srNumber: srNumber,
					submittedSR: submittedSR,
					initialFetch: initialFetch,
					validUserHandler: validUserHandler,
					sidebarHandler: sidebarHandler,
					approveHandler: approveHandler,
					deleteUserHandler: deleteUserHandler,
					loadUser: loadUser,
					loadSubmittedSR: loadSubmittedSR,
					setOption: setOption,
					dateHandler: dateHandler,
					productHandler: productHandler,
					setSRNumber: setSRNumber,
				}}
			>
				<Switch>
					<Route path="/verify" component={VerifyPage} />
					<ProtectedRoute path="/user" component={User} />
					<ProtectedRoute path="/logout" component={Logout} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Route exact path="/" component={Login} />
					<Route component={NotFound} />
				</Switch>
			</UserContext.Provider>
		</div>
	);
}

export default App;
