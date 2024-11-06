import React, { useEffect } from "react";
import SkillCard from "../SkillCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Reducers";
import { FaPlus } from "react-icons/fa";
import AddSkillForm from "./AddSkillForm";
import { readSkills } from "../../../../Redux/Actions/skills";

const AddSkills = () => {
	const [showAddSkillForm, setShowAddSkillForm] = React.useState({
		bool: false,
		_id: "",
	});
	const SkillsState = useSelector((state: RootState) => state.skills);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(readSkills() as any);
	}, [SkillsState?.skillCountChanged]);

	return (
		<React.Fragment>
			<div className="border-green-500 rounded-lg border p-5 flex flex-wrap justify-center items-center">
				{SkillsState?.skills?.map((skill: any) => {
					return (
						<div className="m-5" key={skill?._id}>
							<SkillCard
								setShowForm={setShowAddSkillForm}
								showForm={showAddSkillForm}
								skill={skill}
							/>
						</div>
					);
				})}
			</div>
			{showAddSkillForm.bool ? (
				<AddSkillForm
					setShowForm={setShowAddSkillForm}
					showForm={showAddSkillForm}
				/>
			) : (
				<div
					onClick={() => setShowAddSkillForm({ bool: true, _id: "" })}
					className="p-5 border-blue-500 border w-[150px] flex items-center justify-center cursor-pointer">
					<FaPlus fontSize={50} color="blue" />
				</div>
			)}
		</React.Fragment>
	);
};

export default AddSkills;
