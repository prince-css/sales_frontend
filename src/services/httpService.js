import axios from "axios";
import { getJWT } from "./authService";

export const setAuthHeader = () => {
	axios.defaults.headers.common["x-auth-token"] = getJWT("key2");
	axios.interceptors.response.use(null, (error) => {
		const expectedError = error.response && error.response.status >= 400;
		if (!expectedError) {
			alert("Unexpected error occured !!!");
		}
		return Promise.reject(error);
	});
};

export default {
	get: axios.get,
	put: axios.put,
	post: axios.post,
	delete: axios.delete,
};
