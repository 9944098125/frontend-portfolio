import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers";
import AddSkills from "./components/AddSkills";
import ReadSkills from "./components/ReadSkills";
import { readSkills } from "../../Redux/Actions/skills";

const Skills = () => {
	const dispatch = useDispatch();
	const UserDetails = useSelector((state: RootState) => state.login);
	const Token = localStorage.getItem("asp-portfolio-token")
		? localStorage.getItem("asp-portfolio-token")
		: null;

	useEffect(() => {
		dispatch(readSkills() as any);
	}, []);

	return (
		<React.Fragment>
			<div id="skills" className="w-full p-5">
				<h1 className="text-2xl text-blue-600 font-bold underline mb-5">
					Skills
				</h1>
				{UserDetails?.token || Token ? <AddSkills /> : <ReadSkills />}
			</div>
		</React.Fragment>
	);
};

export default Skills;
