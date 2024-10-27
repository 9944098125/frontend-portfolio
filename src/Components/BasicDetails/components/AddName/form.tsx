import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUserDetails } from "../../../../Redux/Actions/login";
import { RootState } from "../../../../Redux/Reducers";
import { Icons } from "../../../../Utils/icons";
import { showToast } from "../../../../Utils/show-toast";

type Props = {
	changeImage: (file: File) => void;
	imageUploadLoading: boolean;
	image: string;
	setImage: any;
};

const UserForm = (props: Props) => {
	const { changeImage, imageUploadLoading, image, setImage } = props;
	const dispatch = useDispatch();
	const form = useForm();

	const UserDetails = useSelector((state: RootState) => state.login);

	const user = localStorage.getItem("asp-portfolio-user")
		? JSON.parse(localStorage.getItem("asp-portfolio-user") || "")
		: null;

	const submitUserForm = (data: any) => {
		console.log("data", data);
		const body = {
			name: data?.name,
			email: data?.email,
			occupation: data?.occupation,
			summary: data?.roleSummary,
			age: data?.age,
			image: image,
		};
		dispatch(addUser(user?._id, body) as any);
	};

	useEffect(() => {
		dispatch(getUserDetails(user?._id) as any);
	}, [dispatch, user?._id, UserDetails?.userDetailsAdded]);

	useEffect(() => {
		if (UserDetails?.user) {
			form.setValue("name", UserDetails?.user?.name);
			form.setValue("email", UserDetails?.user?.email);
			form.setValue("occupation", UserDetails?.user?.occupation);
			form.setValue("roleSummary", UserDetails?.user?.summary);
			form.setValue("age", UserDetails?.user?.age);
			setImage(UserDetails?.user?.image);
		}
	}, [UserDetails?.user]);

	useEffect(() => {
		if (UserDetails?.user) {
			showToast("User Details Added Successfully", "success");
		}
		if (UserDetails?.error) {
			showToast(UserDetails?.error, "error");
		}
	}, [UserDetails?.user]);

	return (
		<React.Fragment>
			<form
				onSubmit={form.handleSubmit(submitUserForm)}
				className="p-5 border-2 border-blue-600 rounded-lg bg-blue-50">
				<div className="p-2 mb-5">
					<label htmlFor="name" className="font-bold text-blue-800">
						Full Name
					</label>
					<input
						type="text"
						id="name"
						{...form.register("name", { required: true })}
						placeholder="Enter Your Name"
						className="w-full h-[45px] bg-white border-none outline-none px-2 rounded-lg"
					/>
				</div>

				<div className="p-2 mb-5">
					<label htmlFor="emailInForm" className="font-bold text-blue-800">
						Email Address
					</label>
					<input
						type="email"
						id="emailInForm"
						{...form.register("email", { required: true })}
						placeholder="Enter Your Email Address"
						className="w-full h-[45px] bg-white border-none outline-none px-2 rounded-lg"
					/>
				</div>

				<div className="p-2 mb-5">
					<label htmlFor="occupation" className="font-bold text-blue-800">
						Occupation
					</label>
					<input
						type="text"
						id="occupation"
						{...form.register("occupation", { required: true })}
						placeholder="Enter Your Occupation"
						className="w-full h-[45px] bg-white border-none outline-none px-2 rounded-lg"
					/>
				</div>

				<div className="p-2 mb-5">
					<label htmlFor="roleSummary" className="font-bold text-blue-800">
						Role Summary
					</label>
					<textarea
						rows={5}
						id="roleSummary"
						{...form.register("roleSummary")}
						placeholder="Enter Your Role Summary"
						className="w-full bg-white border-none outline-none px-2 rounded-lg"
					/>
				</div>

				<div className="p-2 mb-5 flex items-center justify-between">
					<div className="w-1/2">
						<label htmlFor="age" className="font-bold text-blue-800">
							Age
						</label>
						<input
							type="number"
							id="age"
							{...form.register("age")}
							placeholder="Enter Your Age"
							className="w-full h-[45px] bg-white border-none outline-none px-2 rounded-lg"
						/>
					</div>
					<div className="w-1/2 flex justify-center">
						Profile Photo
						<label htmlFor="image">
							<div className="border-4 border-blue-600 p-2 rounded-full">
								<input
									type="file"
									onChange={(e: any) => changeImage(e.target.files[0])}
									style={{ display: "none" }}
									id="image"
								/>
								{imageUploadLoading ? (
									<Icons.Spinner className="animate-spin h-8 w-8" />
								) : (
									<img
										src={
											image
												? image
												: UserDetails?.user?.image ||
												  "https://www.w3schools.com/howto/img_avatar.png"
										}
										alt=""
										className="rounded-full h-[100px] w-[100px]"
									/>
								)}
							</div>
						</label>
					</div>
				</div>
				<div className="p-2 mb-5">
					<button
						disabled={UserDetails?.loading || imageUploadLoading}
						type="submit"
						className="bg-blue-600 flex items-center justify-center space-x-5 w-full h-[45px] text-white font-bold border-none rounded-lg hover:bg-blue-800">
						<p className="">Submit</p>
						{UserDetails?.loading && (
							<Icons.Spinner className="animate-spin h-8 w-8" />
						)}
					</button>
				</div>
			</form>
		</React.Fragment>
	);
};

export default UserForm;
