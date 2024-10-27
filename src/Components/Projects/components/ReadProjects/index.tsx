import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const dummyData = [
	{
		_id: "1",
		title: "Emoji Game",
		description: "This is a game regarding the emojis",
		images: [
			"https://res.cloudinary.com/dakda5ni3/image/upload/v1706020914/arnu6eiserg0mz3jhjjq.png",
			"https://res.cloudinary.com/dakda5ni3/image/upload/v1705652480/nw8wexzixu3wpyoltkvs.jpg",
		],
		liveLink: "https://asp8.ccbp.tech",
		githubLink: "https://github.com/9944098125",
		techStack: ["React", "Bootstrap", "HTML", "CSS"],
	},
	{
		_id: "1",
		title: "Emoji Game",
		description: "This is a game regarding the emojis",
		images: [
			"https://res.cloudinary.com/dakda5ni3/image/upload/v1706020914/arnu6eiserg0mz3jhjjq.png",
			"https://res.cloudinary.com/dakda5ni3/image/upload/v1705652480/nw8wexzixu3wpyoltkvs.jpg",
		],
		liveLink: "https://asp8.ccbp.tech",
		githubLink: "https://github.com/9944098125",
		techStack: ["React", "Bootstrap", "HTML", "CSS"],
	},
];
const ReadProjects = () => {
	return (
		<React.Fragment>
			<div className="p-6 flex flex-wrap items-center justify-center space-x-8">
				{dummyData.map((item, idx) => (
					<div className="w-96 h-96 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
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
