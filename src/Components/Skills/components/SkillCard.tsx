import React from "react";
import "./styles.css";
import { useDispatch } from "react-redux";
import { deleteSkill } from "../../../Redux/Actions/skills";
import { FaEdit, FaTrash } from "react-icons/fa";

// Define the level classes as a separate object
const levelClasses = {
	Beginner: "skill-border-beginner",
	Intermediate: "skill-border-intermediate",
	Advanced: "skill-border-advanced",
	Professional: "skill-border-professional",
};

type Props = {
	skill: {
		_id: string;
		name: string;
		image: string;
		experience: number;
		level: string;
	};
	showForm?: {
		bool: boolean;
		_id: string;
	};
	setShowForm?: any;
	idx?: number;
};
const SkillCard = (props: Props) => {
	const dispatch = useDispatch();
	const { skill, showForm, setShowForm, idx } = props;
	// Access the level class dynamically
	const levelClass =
		levelClasses[skill.level as keyof typeof levelClasses] || "";

	const Token = localStorage.getItem("asp-portfolio-token");

	const handleDelete = (skillId: string) => {
		dispatch(deleteSkill(skillId) as any);
	};

	const handleEdit = (skillId: string) => {
		setShowForm({ bool: true, _id: skillId });
	};

	return (
		<div
			className={`skill-card shadow-md shadow-blue-400 h-[20rem] w-[20rem] p-2 rounded-full ${
				idx && idx === 1
					? "animate-skills2"
					: Number(idx) % 2 === 0
					? "animate-skills1"
					: "animate-skills2"
			}`}>
			<div className={`skill-logo-container ${levelClass}`}>
				<img
					src={skill.image}
					alt={`${skill.name} logo`}
					className="skill-logo"
				/>
			</div>
			<h3 className="font-bold text-cyan-600 text-[1.8rem]">{skill.name}</h3>
			<p className="font-bold text-blue-400 text-[1.4rem]">
				{skill.experience} years
			</p>
			{Token && (
				<div className="flex items-center justify-between w-full">
					<button
						onClick={() => handleEdit(skill?._id)}
						type="button"
						className="bg-blue-500 text-white p-4 rounded-full">
						<FaEdit />
					</button>
					<button
						onClick={() => handleDelete(skill?._id)}
						type="button"
						className="bg-red-500 text-white p-4 rounded-full">
						<FaTrash />
					</button>
				</div>
			)}
		</div>
	);
};
export default SkillCard;
