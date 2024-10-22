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
		dispatch(getUserDetails(user?._id) as any);
	}, [dispatch, user?._id]);

	return (
		<React.Fragment>
			<div className="p-10 flex justify-between">
				<div className="w-1/2">
					<div className="p-10 h-[12rem]">
						<div className="mb-10 font-bold">
							<h1 className="text-2xl text-blue-700">Hello folks, I'm </h1>
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
					<Details summary={UserDetails?.user?.summary} />
					<Animation />
				</div>
				{/* image container */}
				<div className="w-1/2 flex items-center justify-center">
					<div className="border-4 border-blue-500 p-2 rounded-full">
						{UserDetails?.user ? (
							<img
								src={UserDetails?.user?.image}
								alt=""
								className="w-[25rem] h-[25rem] rounded-full"
							/>
						) : (
							<Icons.Spinner className="text-blue-600 h-10 w-10 animate-spin" />
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ShowName;
