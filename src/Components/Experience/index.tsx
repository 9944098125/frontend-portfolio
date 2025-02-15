import React from "react";
import AddExperience from "./components/AddExperience";
import ReadExperience from "./components/ReadExperience";

const Experience = () => {
	const Token = localStorage.getItem("asp-portfolio-token");
	return (
		<React.Fragment>
			<div id="experience" className="w-full p-5">
				<h1 className="text-2xl text-blue-600 font-bold underline mb-5">
					Experience
				</h1>
				{Token ? <AddExperience /> : <ReadExperience />}
			</div>
		</React.Fragment>
	);
};

export default Experience;
