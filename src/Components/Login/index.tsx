import React, { useState, useEffect } from "react";
import LoginForm from "./components/form";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers";

const Login: React.FC = () => {
	const LoginDetails = useSelector((state: RootState) => state.login);
	const [colors, setColors] = useState<string[]>([
		"#1afff7", // initial colors for the boxes
		"#0047fa",
		"#8900c8",
		"#fc1047",
		"#f27900",
		"#37ff00",
	]);

	// Function to generate random colors
	const getRandomColor = () => {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setColors([
				getRandomColor(),
				getRandomColor(),
				getRandomColor(),
				getRandomColor(),
				getRandomColor(),
				getRandomColor(),
			]);
		}, 5000); // Change colors every 5 seconds

		return () => clearInterval(intervalId); // Cleanup the interval on component unmount
	}, []);

	return (
		<React.Fragment>
			<div className="w-full min-h-[40vh] flex">
				<div
					className={`bg-black p-10 ${
						LoginDetails.token || localStorage.getItem("asp-portfolio-token")
							? "hidden lg:w-full transition-all duration-1000"
							: "hidden lg:w-1/2"
					}`}>
					<div
						className="rounded-lg p-10 mb-10 transition-colors duration-1000"
						style={{ backgroundColor: colors[0] }} // Apply random color
					></div>
					<div className="flex items-center justify-center space-x-5">
						{colors.slice(1).map((color, index) => (
							<div
								key={index}
								className={`rounded-lg h-[25vh] p-10 transition-colors duration-1000 ${
									index % 2 === 0 ? "move-up" : "move-down"
								}`}
								style={{ backgroundColor: color }} // Apply random color
							></div>
						))}
					</div>
				</div>
				<div
					className={` ${
						LoginDetails?.token ? "hidden" : "w-full lg:w-1/2 h-full"
					}`}>
					<LoginForm />
				</div>
			</div>
		</React.Fragment>
	);
};

export default Login;
