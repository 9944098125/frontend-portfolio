import Axios from "axios";

export const Api = Axios.create({
	baseURL: "https://full-stack-portfolio-odnq.onrender.com/api",
	headers: {
		"Content-Type": "application/json",
	},
});
