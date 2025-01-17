import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Reducers";
import SkillCard from "../SkillCard";
import { Icons } from "../../../../Utils/icons";

const ReadSkills = () => {
	const SkillsState = useSelector((state: RootState) => state.skills);
	return (
		<React.Fragment>
			<div className="border-green-500 rounded-lg border p-5 flex flex-wrap justify-center items-center">
				{SkillsState?.skills ? (
					SkillsState?.skills?.map((skill: any, idx:number) => {
						return (
							<div className="mb-5 key={skill?._id}>
								<SkillCard skill={skill} idx={idx} />
							</div>
						);
					})
				) : (
					<Icons.Spinner className="text-blue-500 h-10 w-10 animate-spin" />
				)}
			</div>
		</React.Fragment>
	);
};

export default ReadSkills;
