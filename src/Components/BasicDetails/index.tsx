import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers";
import AddName from "./components/add-name";
import ShowName from "./components/show-name";

const BasicDetails = () => {
	const LoginDetails = useSelector((state: RootState) => state.login);
	const Token = localStorage.getItem("asp-portfolio-token");

	return (
		<React.Fragment>
			<div id="home" className="min-h-screen w-full">
				{LoginDetails?.token || Token ? (
					<React.Fragment>
						<AddName />
					</React.Fragment>
				) : (
					<React.Fragment>
						<ShowName />
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};

export default BasicDetails;
