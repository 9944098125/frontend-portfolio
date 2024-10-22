import React from "react";
import UserForm from "./form";

type Props = {
	changeImage: (file: File) => void;
	imageUploadLoading: boolean;
	image: string;
	setImage: any;
};
const AddName = (props: Props) => {
	const { changeImage, imageUploadLoading, image, setImage } = props;
	return (
		<React.Fragment>
			<div className="p-5">
				<UserForm
					changeImage={changeImage}
					imageUploadLoading={imageUploadLoading}
					image={image}
					setImage={setImage}
				/>
			</div>
		</React.Fragment>
	);
};

export default AddName;
