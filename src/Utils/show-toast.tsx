import toast from "react-hot-toast";

export const showToast = (message: string, type: string) => {
	if (type === "success") {
		toast.success(message, {
			style: {
				border: "1px solid #713200",
				padding: "10px 16px",
				color: "#000000",
				width: "300px",
			},
			iconTheme: {
				primary: "#00664d",
				secondary: "#07dfad",
			},
		});
	} else if (type === "error") {
		toast.error(message, {
			style: {
				border: "1px solid #713200",
				padding: "10px 16px",
				color: "#000000",
				width: "300px",
			},
			iconTheme: {
				primary: "#6f0101",
				secondary: "#db0101",
			},
		});
	} else if (type === "info") {
		toast(message, {
			icon: "🔔",
			style: {
				border: "1px solid #713200",
				padding: "10px 16px",
				color: "#000504",
				width: "300px",
			},
			iconTheme: {
				primary: "#006766",
				secondary: "#00d0ad",
			},
		});
	} else if (type === "loading") {
		toast.loading(message, {
			style: {
				border: "1px solid #713200",
				padding: "10px 16px",
				color: "#000000",
				width: "300px",
			},
			iconTheme: {
				primary: "#01389f",
				secondary: "#0067de",
			},
		});
	} else if (type === "promise") {
		toast.promise(Promise.resolve(message), {
			loading: "Loading...",
			success: (msg) => `${msg}`,
			error: (err) => `Error: ${err}`,
		});
	} else if (type === "custom") {
		toast.custom(message, {
			icon: "👍",
			style: {
				border: "1px solid #713200",
				padding: "10px 16px",
				color: "#000000",
				width: "300px",
			},
			iconTheme: {
				primary: "#986b00",
				secondary: "#cc8f00",
			},
		});
	} else {
		toast(message, {
			style: {
				border: "1px solid #713200",
				padding: "10px 16px",
				color: "#713200",
				width: "300px",
			},
			iconTheme: {
				primary: "#a50198",
				secondary: "#e000cd",
			},
		});
	}
};
