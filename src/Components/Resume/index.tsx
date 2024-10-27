import React from "react";
import AddResume from "./components/AddResume";
import ReadResume from "./components/ReadResume";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers";

const Resume = () => {
	const LoginDetails = useSelector((state: RootState) => state.login);
	const Token = localStorage.getItem("asp-portfolio-token");

	return (
		<React.Fragment>
			<div id="resume" className="min-h-screen w-full p-5">
				<h1 className="text-2xl text-blue-600 font-bold underline mb-5">
					Resume
				</h1>
				{LoginDetails?.token || Token ? <AddResume /> : <ReadResume />}
			</div>
		</React.Fragment>
	);
};

export default Resume;
