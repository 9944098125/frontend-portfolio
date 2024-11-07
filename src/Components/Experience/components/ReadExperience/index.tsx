import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { readExperience } from "../../../../Redux/Actions/experience";
import { RootState } from "../../../../Redux/Reducers";
import ExperienceItem from "../ExperienceItem";

const ReadExperience = () => {
	const dispatch = useDispatch();
	const ExperiencesState = useSelector((state: RootState) => state.experiences);

	useEffect(() => {
		dispatch(readExperience() as any);
	}, []);
	return (
		<React.Fragment>
			<div className="p-5">
				<Carousel
					interval={4000}
					transitionTime={1000}
					stopOnHover
					infiniteLoop={true}
					swipeable
					autoPlay
					axis="horizontal"
					showThumbs={false}
					showStatus={false}>
					{ExperiencesState?.experiences?.map((item, idx) => {
						return (
							<div key={idx} className="border-2 border-blue-500 rounded-lg">
								{[<ExperienceItem key={item._id} item={item} />]}
							</div>
						);
					})}
				</Carousel>
			</div>
		</React.Fragment>
	);
};

export default ReadExperience;
