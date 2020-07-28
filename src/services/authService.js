export const setJWT = (key, data) => {
	window.localStorage.setItem(key, data);
	//console.log("amare call marche  setting er somoy!!");
};
export const getJWT = (key) => {
	const token = window.localStorage.getItem(key);
	//console.log(typeof token);
	//console.log("amare call marche  newar somoy!!");
	//console.log(token);
	return token;
};

export const removeJWT = () => {
	window.localStorage.removeItem("key2");
};
