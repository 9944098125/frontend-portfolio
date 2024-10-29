import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import AddProjectsForm from "./AddProjectsForm";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../../Redux/Actions/projects";
import { RootState } from "../../../../Redux/Reducers";
import ProjectItem from "../ProjectItem";

const AddProjects = () => {
	const dispatch = useDispatch();
	const [showAddForm, setShowAddForm] = useState<{
		bool: boolean;
		_id: string;
	}>({ bool: false, _id: "" });

	const ProjectDetails = useSelector((state: RootState) => state.projects);

	useEffect(() => {
		dispatch(getProjects() as any);
	}, [dispatch, ProjectDetails?.projectsCountChanged]);

	return (
		<React.Fragment>
			<div className="p-6 flex flex-wrap items-center justify-center space-x-8">
				{ProjectDetails?.projects?.map((item: any, idx: number) => (
					<ProjectItem
						setShowAddForm={setShowAddForm}
						key={idx}
						item={item}
						idx={idx}
					/>
				))}
			</div>
			<div className="w-full flex items-center justify-center">
				{!showAddForm.bool ? (
					<div
						onClick={() =>
							setShowAddForm({
								bool: true,
								_id: "",
							})
						}
						className="w-[10rem] cursor-pointer h-[10rem] rounded-full shadow-lg shadow-blue-600 flex items-center justify-center">
						<h1 className="text-5xl font-bold text-blue-600">+</h1>
					</div>
				) : (
					showAddForm.bool && (
						<AddProjectsForm
							setShowAddForm={setShowAddForm}
							showAddForm={showAddForm}
						/>
					)
				)}
			</div>
		</React.Fragment>
	);
};

export default AddProjects;
