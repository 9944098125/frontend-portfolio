import React from "react";
import SkillCard from "./SkillCard";

const AddSkills = () => {
	const skill = {
		image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
		name: "React",
		experience: 3,
		level: "Professional",
	};
	return (
		<React.Fragment>
			<SkillCard skill={skill} />
		</React.Fragment>
	);
};

export default AddSkills;
