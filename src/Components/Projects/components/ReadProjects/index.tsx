import React, { useEffect } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { RootState } from "../../../../Redux/Reducers";
import { getProjects } from "../../../../Redux/Actions/projects";
import ProjectItem from "../ProjectItem";
import { Projects } from "../../../../Interfaces";
import { Icons } from "../../../../Utils/icons";

const ReadProjects = () => {
	const dispatch = useDispatch();
	const Projects = useSelector((state: RootState) => state.projects);

	useEffect(() => {
		dispatch(getProjects() as any);
	}, [Projects?.projectsCountChanged]);
	return (
		<React.Fragment>
			<div className="p-6 flex flex-wrap items-center justify-center space-y-8 lg:space-x-8">
				{Projects?.projects ? (
					Projects.projects.map((item: any, idx: number) => (
						<ProjectItem key={idx} item={item} idx={idx} />
					))
				) : (
					<div className="flex items-center justify-center w-full">
						<Icons.Spinner className="animate-spin h-20 w-20 text-blue-600" />
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default ReadProjects;
