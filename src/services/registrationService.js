import http, { setAuthHeader } from "./httpService";

setAuthHeader();
export const registerUser = async (user) => {
	const res = await http.post(process.env.REACT_APP_USERAPI, user);
	return res;
};
