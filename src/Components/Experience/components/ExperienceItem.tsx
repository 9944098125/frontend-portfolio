import React from "react";
import { FaEdit, FaRemoveFormat } from "react-icons/fa";
import { deleteExperience } from "../../../Redux/Actions/experience";
import { useDispatch } from "react-redux";
import { dateFormate } from "../../../Utils/dateFormatter";

type Props = {
	item: {
		_id: string;
		company: string;
		role: string;
		startDate: Date;
		endDate: Date;
		experienceSummary: string;
		technologiesWorkedOn: string[];
		responsibilities: string;
	};
	showForm?: { bool: boolean; _id: string };
	setShowForm?: any;
};
const ExperienceItem = (props: Props) => {
	const { item, setShowForm } = props;
	const dispatch = useDispatch();
	const Token = localStorage.getItem("asp-portfolio-token");
	return (
		<React.Fragment>
			<div className="w-full mb-5 bg-white rounded-lg shadow-lg flex flex-col justify-center relative">
				{Token && (
					<div
						onClick={() => {
							dispatch(deleteExperience(item?._id) as any);
						}}
						className="absolute cursor-pointer bg-red-500 flex items-center justify-center text-white right-[25px] top-[50px] h-10 w-10 rounded-full">
						X
					</div>
				)}
				<div key="experience-item" className="w-full p-4">
					<div className="flex items-center justify-between px-5">
						<p className="text-cyan-500 underline font-bold text-md">
							{dateFormate(item?.startDate)}
						</p>
						<p className="text-red-500 underline font-bold text-md">
							{item?.endDate ? dateFormate(item?.endDate) : "Present"}
						</p>
					</div>
					<h2 className="text-xl font-bold mb-2">{item.company}</h2>
					<p className="text-sm font-semibold text-cyan-500">
						<span className="text-black">Role: </span>
						{item?.role}
					</p>

					<p className="text-gray-700 text-left mb-2">
						{item?.experienceSummary}
					</p>

					<div className="flex items-center space-x-2 flex-wrap">
						<p className="text-cyan-500 font-bold">
							I've worked on the technologies:
						</p>
						{item?.technologiesWorkedOn?.map((tech, idx) => {
							return (
								<span
									key={idx}
									className="bg-gray-200 text-gray-800 text-sm font-semibold px-2 py-1 rounded-full">
									{tech?.charAt(0).toUpperCase() + tech?.slice(1)}
								</span>
							);
						})}
					</div>
					<div className="p-5">
						{item?.responsibilities && (
							<div>
								<p className="text-cyan-500 text-left font-bold">
									Responsibilities:
								</p>
								<div className="text-gray-700 text-left mb-2">
									{item.responsibilities.split("\n").map((line, index) => (
										<p key={index}>{line}</p>
									))}
								</div>
							</div>
						)}
					</div>

					<div className="flex items-center space-x-2">
						{Token && (
							<div
								onClick={() =>
									setShowForm && setShowForm({ bool: true, _id: item?._id })
								}
								className="border border-black rounded-full cursor-pointer p-5">
								<FaEdit />
							</div>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default ExperienceItem;
