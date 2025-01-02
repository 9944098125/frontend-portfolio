import React, { useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaEye, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { RootState } from "../../../Redux/Reducers";
import { deleteProject } from "../../../Redux/Actions/projects";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

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

const ProjectItemModal = (props: Props) => {
	const dispatch = useDispatch();
	const { item, idx, setShowAddForm } = props;
	const UserDetails = useSelector((state: RootState) => state.login);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<React.Fragment>
			{/* Button or Trigger to open modal */}
			<button
				onClick={openModal}
				className="border border-black rounded-full p-5">
				<FaEye />
			</button>

			{/* Modal Component */}
			<Modal
				open={isModalOpen}
				onClose={closeModal}
				styles={{
					modal: {
						borderRadius: "12px",
						padding: "15px",
					},
				}}
				closeOnOverlayClick={false}
				center>
				<div className="w-full min-h-96 bg-white rounded-lg shadow-lg flex flex-col items-center p-5">
					{UserDetails?.token && (
						<div
							onClick={() => {
								dispatch(deleteProject(item?._id) as any);
								closeModal();
							}}
							className="absolute cursor-pointer bg-red-500 flex items-center justify-center text-white right-[-25px] top-[-25px] h-10 w-10 rounded-full">
							X
						</div>
					)}
					<Carousel
						interval={4000}
						transitionTime={1000}
						stopOnHover
						infiniteLoop
						swipeable
						autoPlay
						axis={idx + 2 / 2 === 1 ? "horizontal" : "vertical"}
						showThumbs={false}
						showStatus={false}>
						{item?.images?.map((image, idx) => (
							<div key={idx}>
								<img
									src={image}
									alt="project"
									className="w-full h-[50vh] object-cover rounded-lg"
								/>
							</div>
						))}
					</Carousel>

					<div className="w-full p-4 h-[200px] overflow-y-scroll">
						<h2 className="text-xl font-bold mb-2">{item.title}</h2>
						<p className="text-gray-700 mb-4">{item.description}</p>
						<p className="text-blue-600 font-bold">
							<span className="text-gray-500 font-normal">Tech Stack: </span>
							{item?.techStack
								?.map((tech) => tech.charAt(0).toUpperCase() + tech.slice(1))
								.join(", ")}
						</p>

						<div className="flex items-center space-x-2">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={item.liveLink}
								style={{ textDecoration: "none", color: "inherit" }}>
								<div className="border border-black rounded-full p-5">
									<FaExternalLinkAlt size={15} />
								</div>
							</a>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={item.githubLink}
								style={{ textDecoration: "none", color: "inherit" }}>
								<div className="border border-black rounded-full p-5">
									<FaGithub size={15} />
								</div>
							</a>
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
						</div>
					</div>
				</div>
			</Modal>
		</React.Fragment>
	);
};
export default ProjectItemModal;
