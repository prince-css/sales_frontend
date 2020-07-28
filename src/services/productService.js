import http, { setAuthHeader } from "./httpService";

export const getProducts = async () => {
	setAuthHeader();
	//axios.defaults.headers.common["x-auth-token"] = getJWT("key2");
	const products = await http.get(process.env.REACT_APP_IMSFORMATAPI);
	return products;
};
export const updateProducts = async (arr) => {
	const products = await http.put(process.env.REACT_APP_IMSFORMATAPI, arr);
	return products;
};
export const addProducts = async (arr) => {
	const products = await http.post(process.env.REACT_APP_IMSFORMATAPI, arr);
	return products;
};

export const getIms = async (date) => {
	const ims = await http.get(process.env.REACT_APP_IMSFORMATAPI, date);
	return ims;
};

export const addSales = async (obj) => {
	const products = await http.post(process.env.REACT_APP_IMSAPI, obj);
	return products;
};

export const getSales = async (qs, header1, header2) => {
	//console.log(qs);
	const products = await http.get(`${process.env.REACT_APP_IMSAPI}?${qs}`, {
		headers: {
			recentims: header1,
			lastims: header2,
		},
	});
	return products;
};
export const getSubmittedSR = async (qs) => {
	//console.log(qs);
	const res = await http.get(`${process.env.REACT_APP_IMSAPI}?${qs}`);
	return res;
};
