import Axios from "axios";

export const Api = Axios.create({
	// baseURL: "https://full-stack-portfolio-odnq.onrender.com/api",
	baseURL: "https://full-stack-portfolio-production-8787.up.railway.app/api",
	headers: {
		"Content-Type": "application/json",
	},
});
