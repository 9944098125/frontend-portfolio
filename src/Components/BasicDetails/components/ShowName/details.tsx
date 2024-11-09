import React from "react";
import { Section } from "./animated-entry";
import { Icons } from "../../../../Utils/icons";

const Details = ({ summary, image }: { summary: string; image: string }) => {
	const lines = summary ? summary.split("\n") : [];
	return (
		<React.Fragment>
			<Section>
				<div className="flex flex-col gap-5 w-full">
					{/* First Half - Half-width Section */}
					<div className="flex items-center space-x-5">
						<div className="w-1/2 text-blue-700 border-2 border-blue-500 p-5 rounded-md font-semibold text-[14px] font-cursive">
							{summary ? (
								lines
									.slice(0, Math.ceil(lines.length / 4))
									.map((line, index) => <p key={index}>{line}</p>)
							) : (
								<Icons.Spinner className="animate-spin h-10 w-10 text-blue-600" />
							)}
						</div>
						{/* image container */}
						<div className="flex items-center justify-center">
							<div className="border-4 border-blue-500 p-2 rounded-full">
								{image ? (
									<img
										src={image}
										alt=""
										className="w-[25rem] h-[25rem] rounded-full animate-pulse-image"
									/>
								) : (
									<Icons.Spinner className="text-blue-600 h-10 w-10 animate-spin" />
								)}
							</div>
						</div>
					</div>

					{/* Second Half - Full-width Section */}
					<div className="w-[90vw] z-[199] text-blue-700 border-2 border-blue-500 p-5 rounded-md font-semibold text-[16px] font-cursive">
						{summary ? (
							<p>{lines.slice(Math.ceil(lines.length / 4)).join("\n")}</p>
						) : (
							<Icons.Spinner className="animate-spin h-10 w-10 text-blue-600" />
						)}
					</div>
				</div>
			</Section>
		</React.Fragment>
	);
};

export default Details;
