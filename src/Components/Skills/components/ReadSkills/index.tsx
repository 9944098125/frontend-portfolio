import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Reducers";
import SkillCard from "../SkillCard";

const ReadSkills = () => {
	const SkillsState = useSelector((state: RootState) => state.skills);
	return (
		<React.Fragment>
			<div className="border-green-500 rounded-lg border p-5 flex flex-wrap justify-center items-center">
				{SkillsState?.skills?.map((skill: any) => {
					return (
						<div className="m-5" key={skill?._id}>
							<SkillCard skill={skill} />
						</div>
					);
				})}
			</div>
		</React.Fragment>
	);
};

export default ReadSkills;
