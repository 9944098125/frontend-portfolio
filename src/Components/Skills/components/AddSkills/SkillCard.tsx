import React from "react";
import "../styles.css";

// Define the level classes as a separate object
const levelClasses = {
	Beginner: "skill-border-beginner",
	Intermediate: "skill-border-intermediate",
	Advanced: "skill-border-advanced",
	Professional: "skill-border-professional",
};

type Props = {
	skill: {
		name: string;
		image: string;
		experience: number;
		level: string;
	};
};
const SkillCard = (props: Props) => {
	const { skill } = props;
	// Access the level class dynamically
	const levelClass =
		levelClasses[skill.level as keyof typeof levelClasses] || "";

	return (
		<div className="skill-card">
			<div className={`skill-logo-container ${levelClass}`}>
				<img
					src={skill.image}
					alt={`${skill.name} logo`}
					className="skill-logo"
				/>
			</div>
			<h3 className="font-semibold text-pink-600 text-[1.8rem]">
				{skill.name}
			</h3>
			<p className="font-bold text-blue-400 text-[1.4rem]">
				Experience: {skill.experience} years
			</p>
		</div>
	);
};
export default SkillCard;
