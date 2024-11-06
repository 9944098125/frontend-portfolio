import React from "react";
import { FaEdit, FaExternalLinkAlt, FaEye, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { RootState } from "../../../Redux/Reducers";
import { deleteProject } from "../../../Redux/Actions/projects";
import ProjectItemModal from "./ProjectItemModal";

type Props = {
	item: {
		title: string;
		description: string;
		images: string[];
		liveLink: string;
		githubLink: string;
		techStack: string[];
		createdAt: string;
		updatedAt: string;
		__v: number;
		_id: string;
	};
	idx: number;
	setShowAddForm?: any;
};
const ProjectItem = (props: Props) => {
	const dispatch = useDispatch();
	const { item, idx, setShowAddForm } = props;
	const UserDetails = useSelector((state: RootState) => state.login);

	const [showProjectModal, setShowProjectModal] = React.useState(false);

	return (
		<React.Fragment>
			<div className="w-96 min-h-96 mb-5 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center relative">
				{UserDetails?.token && (
					<div
						onClick={() => {
							dispatch(deleteProject(item?._id) as any);
						}}
						className="absolute cursor-pointer bg-red-500 flex items-center justify-center text-white right-[-25px] top-[-25px] h-10 w-10 rounded-full">
						X
					</div>
				)}
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
					<p
						className="text-gray-700 mb-2"
						style={{
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: 2,
							overflow: "hidden",
						}}>
						{item.description}
					</p>
					<div className="flex items-center space-x-2">
						{UserDetails?.token && (
							<div
								onClick={() =>
									setShowAddForm &&
									setShowAddForm({ bool: true, _id: item?._id })
								}
								className="border border-black rounded-full cursor-pointer p-5">
								<FaEdit />
							</div>
						)}
						<ProjectItemModal
							item={item}
							idx={idx}
							setShowAddForm={setShowAddForm}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ProjectItem;
