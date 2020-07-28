import { removeJWT } from "../services/authService";

function Logout(props) {
	removeJWT();
	//console.log("tata");
	window.location.replace("/login");
}

export default Logout;
