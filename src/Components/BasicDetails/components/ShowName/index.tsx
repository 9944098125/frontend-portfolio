import React, { useEffect } from "react";
import TypingAnimation from "./typing-animation";
import Details from "./details";
import Animation from "./animation";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../../Redux/Actions/login";
import { RootState } from "../../../../Redux/Reducers";
import { Icons } from "../../../../Utils/icons";

const ShowName = () => {
	const dispatch = useDispatch();

	const UserDetails = useSelector((state: RootState) => state.login);

	const user = localStorage.getItem("asp-portfolio-user")
		? JSON.parse(localStorage.getItem("asp-portfolio-user")!)
		: null;

	useEffect(() => {
		dispatch(getUserDetails() as any);
	}, [dispatch, user?._id]);

	return (
		<React.Fragment>
			<div className="p-10 flex justify-between">
				<div className="">
					<div className="p-10 h-[12rem]">
						<div className="mb-10 font-bold">
							<h1 className="text-2xl text-blue-700">Namaste ! I'm </h1>
							{UserDetails?.user ? (
								<TypingAnimation
									name={UserDetails.user?.name}
									occupation={UserDetails.user?.occupation}
								/>
							) : (
								<div className="flex items-center justify-center">
									<Icons.Spinner className="text-blue-600 h-10 w-10 animate-spin" />
								</div>
							)}
						</div>
					</div>
					<Details
						image={UserDetails?.user?.image}
						summary={UserDetails?.user?.summary}
					/>
					<Animation />
				</div>
			</div>
		</React.Fragment>
	);
};

export default ShowName;
