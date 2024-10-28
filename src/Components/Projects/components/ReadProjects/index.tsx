import React, { useEffect } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { RootState } from "../../../../Redux/Reducers";
import { getProjects } from "../../../../Redux/Actions/projects";

const ReadProjects = () => {
	const dispatch = useDispatch();
	const Projects = useSelector((state: RootState) => state.projects);

	useEffect(() => {
		dispatch(getProjects() as any);
	}, [Projects?.projectsCountChanged]);
	return (
		<React.Fragment>
			<div className="p-6 flex flex-wrap items-center justify-center space-x-8">
				{Projects?.projects?.map((item, idx) => (
					<div className="w-96 min-h-96 mb-5 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
						<Carousel
							interval={4000}
							transitionTime={1000}
							stopOnHover
							infiniteLoop={true}
							swipeable
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
		</React.Fragment>
	);
};

export default ReadProjects;
