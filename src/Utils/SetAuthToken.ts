import { Api } from "../Redux/Api/Api";

const SetAuthToken = (token: string) => {
	if (token) {
		localStorage.setItem("token", token);
		Api.defaults.headers.common["Authorization"] = "Bearer " + token;
	} else {
		localStorage.removeItem("token");
		delete Api.defaults.headers.common["Authorization"];
	}
};

export default SetAuthToken;
