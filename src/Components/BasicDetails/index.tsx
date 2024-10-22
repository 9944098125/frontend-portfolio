import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Reducers";
import AddName from "./components/AddName";
import ShowName from "./components/ShowName";
import "./styles.css";

const BasicDetails = () => {
	const LoginDetails = useSelector((state: RootState) => state.login);
	const Token = localStorage.getItem("asp-portfolio-token");
	const [imageUploadLoading, setImageUploadLoading] = React.useState(false);
	const [image, setImage] = React.useState("");

	const changeImage = async (file: File) => {
		setImageUploadLoading(true);
		if (file === null) {
			return;
		} else if (
			file.type === "image/jpeg" ||
			"image/jpg" ||
			"image/png" ||
			"image.svg" ||
			"image/gfif"
		) {
			const imgData = new FormData();
			imgData.append("file", file);
			imgData.append("upload_preset", "save_qa");
			imgData.append("cloud_name", "dakda5ni3");
			await fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
				method: "POST",
				body: imgData,
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					setImage(data.url);
					setImageUploadLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return;
		}
	};

	return (
		<React.Fragment>
			<div id="home" className="min-h-screen w-full">
				{LoginDetails?.token || Token ? (
					<React.Fragment>
						<AddName
							changeImage={changeImage}
							imageUploadLoading={imageUploadLoading}
							image={image}
							setImage={setImage}
						/>
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
