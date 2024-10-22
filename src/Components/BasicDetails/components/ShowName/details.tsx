import React from "react";
import { Section } from "./animated-entry";
import { Icons } from "../../../../Utils/icons";

const Details = ({ summary }: { summary: string }) => {
	return (
		<React.Fragment>
			<Section>
				<div className="text-blue-700 border-2 border-blue-500 p-5 rounded-md font-bold text-2xl font-cursive">
					{summary ? (
						summary
					) : (
						<Icons.Spinner className="animate-spin h-10 w-10 text-blue-600" />
					)}
				</div>
			</Section>
		</React.Fragment>
	);
};

export default Details;
