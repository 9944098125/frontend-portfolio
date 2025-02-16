import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers";
import AddProjects from "./components/AddProjects";
import ReadProjects from "./components/ReadProjects";

const Projects = () => {
	const UserDetails = useSelector((state: RootState) => state.login);

	const Token = localStorage.getItem("asp-portfolio-token");
	return (
		<React.Fragment>
			<div id="projects" className="w-full p-5">
				<h1 className="text-2xl text-blue-600 font-bold underline mb-5">
					Projects
				</h1>
				{UserDetails?.token || Token ? <AddProjects /> : <ReadProjects />}
			</div>
		</React.Fragment>
	);
};

export default Projects;
