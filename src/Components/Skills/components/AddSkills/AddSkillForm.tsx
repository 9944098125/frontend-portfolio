import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Reducers";
import { createSkill, updateSkills } from "../../../../Redux/Actions/skills";
import { Icons } from "../../../../Utils/icons";
import { getUserDetails } from "../../../../Redux/Actions/login";
import skills from "../../../../Redux/Reducers/skills";

const AddSkillForm = ({ setShowForm, showForm }: any) => {
	const dispatch = useDispatch();
	const [skillImage, setSkillImage] = useState<string>("");
	const [imageUploadLoading, setImageUploadLoading] = useState(false);

	const Token = localStorage.getItem("asp-portfolio-token");
	const user = localStorage.getItem("asp-portfolio-user")
		? JSON.parse(localStorage.getItem("asp-portfolio-user") || "")
		: null;

	const UserDetails = useSelector((state: RootState) => state.login);
	const SkillsState = useSelector((state: RootState) => state.skills);
	const form = useForm();

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
					setSkillImage(data.url);
					setImageUploadLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return;
		}
	};

	console.log("userDetails", UserDetails?.user);

	const submitAddSkillForm = (data: any) => {
		const body = {
			name: data?.skillName,
			level: data?.skillLevel,
			image: skillImage,
			experience: data?.experience,
		};
		if (showForm?._id) {
			dispatch(updateSkills(body, showForm?._id) as any);
		} else {
			dispatch(createSkill(body, UserDetails?.user?._id || user?._id) as any);
		}
		setShowForm({ bool: false, _id: "" });
	};
	console.log(SkillsState?.skills);
	useEffect(() => {
		if (showForm.bool) {
			const selectedSkill = SkillsState?.skills?.filter(
				(d) => d?._id === showForm?._id
			)?.[0];
			form.setValue("skillName", selectedSkill?.name);
			form.setValue("skillLevel", selectedSkill?.level);
			form.setValue("experience", selectedSkill?.experience);
			setSkillImage(selectedSkill?.image);
		}
	}, [showForm, SkillsState?.skills]);

	useEffect(() => {
		dispatch(getUserDetails() as any);
	}, []);

	return (
		<React.Fragment>
			<div className="w-full  relative">
				<p
					onClick={() => {
						setShowForm({ bool: false, _id: "" });
					}}
					className="cursor-pointer absolute right-[-25px] h-10 flex items-center justify-center w-10 top-[-25px] bg-blue-500 text-white p-2 rounded-full">
					X
				</p>
				<form
					className="w-full"
					onSubmit={form.handleSubmit(submitAddSkillForm)}>
					<div className="w-full flex items-center space-x-5">
						<div className="w-1/2 p-2">
							<input
								type="text"
								className="w-full rounded-sm h-[45px] border-blue-500 border"
								{...form.register("skillName")}
							/>
						</div>

						<div className="w-1/2 p-2">
							<select
								className="w-full h-[45px] rounded-sm border-blue-500 border"
								value={form.watch("skillLevel")}
								{...form.register("skillLevel")}>
								{["Beginner", "Intermediate", "Advanced", "Professional"].map(
									(level, idx) => {
										return <option key={idx}>{level}</option>;
									}
								)}
							</select>
						</div>
					</div>
					<div className="flex items-center space-x-5">
						<div className="w-1/2 flex items-center justify-center p-2">
							<label htmlFor="skillImage">
								<input
									type="file"
									onChange={(e: any) => changeImage(e.target.files[0])}
									style={{ display: "none" }}
									id="skillImage"
								/>
								<img
									src={
										skillImage ||
										"https://cdn.pixabay.com/photo/2018/03/26/10/21/skills-3262172_640.jpg"
									}
									alt=""
									height={100}
									width={100}
									style={{ borderRadius: "50%" }}
								/>
							</label>
						</div>

						<div className="w-1/2 p-2">
							<input
								type="text"
								className="w-full rounded-sm h-[45px] border-blue-500 border"
								{...form.register("experience")}
							/>
						</div>
					</div>
					{(UserDetails?.user || Token) && (
						<button
							disabled={imageUploadLoading}
							type="submit"
							className="bg-blue-600 px-6 py-2 text-white rounded-md border-none outline-none">
							Submit{" "}
							{SkillsState?.loading && (
								<Icons.Spinner className="animate-spin h-5 w-5" />
							)}
						</button>
					)}
				</form>
			</div>
		</React.Fragment>
	);
};

export default AddSkillForm;
