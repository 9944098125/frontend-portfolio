import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import AddProjectsForm from "./AddProjectsForm";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../../Redux/Actions/projects";
import { RootState } from "../../../../Redux/Reducers";

const AddProjects = () => {
	const dispatch = useDispatch();
	const [showAddForm, setShowAddForm] = useState<boolean>(false);

	const ProjectDetails = useSelector((state: RootState) => state.projects);

	useEffect(() => {
		dispatch(getProjects() as any);
	}, [dispatch, ProjectDetails?.projectsCountChanged]);

	return (
		<React.Fragment>
			<div className="p-6 flex flex-wrap items-center justify-center space-x-8">
				{ProjectDetails?.projects?.map((item, idx) => (
					<div className="w-96 min-h-96 bg-white mb-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
						<Carousel
							autoPlay
							axis={idx + 2 / 2 === 1 ? "horizontal" : "vertical"}
							showThumbs={false}
							showStatus={false}>
							{item?.images?.map((image, idx) => {
								return (
									<div key={idx}>
										<img
											src={image}
											alt="project"
											className="w-full h-48 object-cover rounded-t-lg"
										/>
									</div>
								);
							})}
						</Carousel>
						<div className="w-full p-4">
							<h2 className="text-xl font-bold mb-2">{item.title}</h2>
							<p className="text-gray-700 mb-2">{item.description}</p>
							<div className="flex items-center space-x-2">
								<Link
									to={item?.liveLink}
									style={{ textDecoration: "none", color: "inherit" }}>
									<div className="border border-black rounded-full p-5">
										<FaExternalLinkAlt size={15} />
									</div>
								</Link>
								<Link
									to={item?.githubLink}
									style={{ textDecoration: "none", color: "inherit" }}>
									<div className="border border-black rounded-full p-5">
										<FaGithub size={15} />
									</div>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="w-full flex items-center justify-center">
				{!showAddForm ? (
					<div
						onClick={() => setShowAddForm(true)}
						className="w-[10rem] cursor-pointer h-[10rem] rounded-full shadow-lg shadow-blue-600 flex items-center justify-center">
						<h1 className="text-5xl font-bold text-blue-600">+</h1>
					</div>
				) : (
					<AddProjectsForm />
				)}
			</div>
		</React.Fragment>
	);
};

export default AddProjects;
