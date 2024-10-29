import React, { useEffect } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { RootState } from "../../../../Redux/Reducers";
import { getProjects } from "../../../../Redux/Actions/projects";
import ProjectItem from "../ProjectItem";
import { Projects } from "../../../../Interfaces";

const ReadProjects = () => {
	const dispatch = useDispatch();
	const Projects = useSelector((state: RootState) => state.projects);

	useEffect(() => {
		dispatch(getProjects() as any);
	}, [Projects?.projectsCountChanged]);
	return (
		<React.Fragment>
			<div className="p-6 flex flex-wrap items-center justify-center space-x-8">
				{Projects?.projects?.map((item: any, idx: number) => (
					<ProjectItem key={idx} item={item} idx={idx} />
				))}
			</div>
		</React.Fragment>
	);
};

export default ReadProjects;
