import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Reducers";
import ExperienceItem from "../ExperienceItem";
import AddExperienceForm from "./Form";
import { readExperience } from "../../../../Redux/Actions/experience";
import { Carousel } from "react-responsive-carousel";

const AddExperience = () => {
	const [showForm, setShowForm] = useState({ bool: false, _id: "" });
	const ExperiencesState = useSelector((state: RootState) => state.experiences);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(readExperience() as any);
	}, [dispatch, ExperiencesState?.experiencesCountChanged]);

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
								{[
									<ExperienceItem
										key={item._id}
										showForm={showForm}
										setShowForm={setShowForm}
										item={item}
									/>,
								]}
							</div>
						);
					})}
				</Carousel>
				{showForm.bool ? (
					<AddExperienceForm showForm={showForm} setShowForm={setShowForm} />
				) : (
					<div
						onClick={() => setShowForm({ bool: true, _id: "" })}
						className="border-2 border-green-500 rounded-full w-[5rem] h-[5rem] flex items-center justify-center cursor-pointer">
						<p className="text-5xl text-green-500 font-bold">+</p>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default AddExperience;
