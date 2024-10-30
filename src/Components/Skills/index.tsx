import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers";
import AddSkills from "./components/AddSkills";
import ReadSkills from "./components/ReadSkills";

const Skills = () => {
	const UserDetails = useSelector((state: RootState) => state.login);
	const Token = localStorage.getItem("asp-portfolio-token")
		? localStorage.getItem("asp-portfolio-token")
		: null;

	return (
		<React.Fragment>
			<div id="skills" className="min-h-screen w-full p-5">
				<h1 className="text-2xl text-blue-600 font-bold underline mb-5">
					Skills
				</h1>
				{UserDetails?.token || Token ? <AddSkills /> : <ReadSkills />}
			</div>
		</React.Fragment>
	);
};

export default Skills;
