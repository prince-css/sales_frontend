import http from "./httpService";

export const getUser = async (id) => {
	const user = await http.get(`${process.env.REACT_APP_USERAPI}${id}`);
	return user;
};
export const getSR = async () => {
	const res = await http.get(`${process.env.REACT_APP_USERAPI}`);
	return res;
};
export const getAllSR = async (qs) => {
	const res = await http.get(`${process.env.REACT_APP_USERAPI}?${qs}`);
	return res;
};

export const approveUser = async (id, isApproved) => {
	const res = await http.put(
		`${process.env.REACT_APP_USERAPI}${id}`,
		isApproved
	);
	return res;
};
export const deleteUser = async (id) => {
	const res = await http.delete(`${process.env.REACT_APP_USERAPI}${id}`);
	return res;
};
