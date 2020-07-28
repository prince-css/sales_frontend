import http from "./httpService";

export const loginUser = async (obj) => {
	const res = await http.post(process.env.REACT_APP_LOGINAPI, obj);
	return res;
};
