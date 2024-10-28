import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { createProject } from "../../../../Redux/Actions/projects";
import { RootState } from "../../../../Redux/Reducers";
import { Icons } from "../../../../Utils/icons";

const AddProjectsForm = () => {
	const dispatch = useDispatch();
	const form = useForm();

	const ProjectDetails = useSelector((state: RootState) => state.projects);

	const user = localStorage.getItem("asp-portfolio-user")
		? JSON.parse(localStorage.getItem("asp-portfolio-user") || "{}")
		: null;
	const [techStack, setTechStack] = useState<string[]>();
	const [uploading, setUploading] = useState(false);
	const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
	const submitData = (data: any) => {
		const body = {
			title: data?.title,
			description: data?.description,
			techStack: techStack,
			images: uploadedUrls,
			githubLink: data?.githubLink,
			liveLink: data?.liveLink,
		};
		dispatch(createProject(body, user?._id) as any);
	};

	const uploadImages = async (files: File[]) => {
		if (!files) return;

		setUploading(true);
		const uploadPromises = Array.from(files).map((file) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "save_qa"); // Replace with your upload preset
			formData.append("cloud_name", "dakda5ni3"); // Replace with your Cloudinary cloud name

			return axios
				.post(
					"https://api.cloudinary.com/v1_1/dakda5ni3/image/upload",
					formData
				)
				.then((response) => response.data.secure_url)
				.catch((err) => {
					console.error("Error uploading image:", err);
					return null;
				});
		});

		try {
			const results = await Promise.all(uploadPromises);
			const successfulUploads = results.filter(
				(url) => url !== null
			) as string[];
			setUploadedUrls(successfulUploads);
			console.log("Uploaded URLs:", successfulUploads);
		} catch (error) {
			console.error("Error uploading images:", error);
		} finally {
			setUploading(false);
		}
	};

	const animatedComponents = makeAnimated();

	const options = [
		{ value: "react", label: "ReactJS" },
		{ value: "node", label: "NodeJS" },
		{ value: "react native", label: "React Native" },
		{ value: "bootstrap", label: "Bootstrap" },
		{ value: "tailwind", label: "TailwindCSS" },
		{ value: "mui", label: "MUI" },
		{ value: "kotlin", label: "Kotlin" },
		{ value: "mongoDb", label: "MongoDB" },
		{ value: "express", label: "ExpressJS" },
	];

	const handleChangeTechStack = (
		selectedOptions: readonly { value: string; label: string }[]
	) => {
		const selectedCategories = selectedOptions.map((option) => option.value);
		setTechStack(selectedCategories);
	};

	return (
		<React.Fragment>
			<form className="w-full" onSubmit={form.handleSubmit(submitData)}>
				<div className="p-6 w-full">
					<div className="grid grid-cols-12 gap-6 p-10">
						<div className="col-span-6">
							<div className="w-full mb-10">
								<input
									type="text"
									placeholder="Project Title"
									className="w-full p-2 rounded-lg outline-blue-500 border border-blue-500 h-[45px]"
									{...form.register("title")}
								/>
							</div>
							<div className="w-full">
								<Select
									closeMenuOnSelect={false}
									components={animatedComponents}
									isMulti
									options={options}
									onChange={(selected) =>
										handleChangeTechStack(
											selected as readonly { value: string; label: string }[]
										)
									}
									className="w-full"
								/>
							</div>
						</div>

						<div className="col-span-6">
							<textarea
								rows={6}
								placeholder="Description"
								{...form.register("description")}
								className="w-full p-5 border border-blue-500 rounded-lg outline-blue-500"
							/>
						</div>

						<div className="col-span-6">
							<div className="w-full mb-10">
								<input
									type="text"
									placeholder="Github Link"
									className="w-full p-2 rounded-lg outline-blue-500 border border-blue-500 h-[45px]"
									{...form.register("githubLink")}
								/>
							</div>
							<div className="w-full mb-10">
								<input
									type="text"
									placeholder="Live Link"
									className="w-full p-2 rounded-lg outline-blue-500 border border-blue-500 h-[45px]"
									{...form.register("liveLink")}
								/>
							</div>
						</div>
						<div className="col-span-6">
							<div className="w-full mb-10">
								<input
									type="file"
									multiple
									onChange={(e: any) => uploadImages(e.target.files)}
								/>
							</div>
						</div>
						<button
							disabled={uploading || ProjectDetails?.loading}
							type="submit"
							className="bg-blue-500 rounded-lg hover:bg-blue-700 px-5 py-2 border-none text-white font-bold">
							Submit{" "}
							{uploading ||
								(ProjectDetails?.loading && (
									<Icons.Spinner className="h-5 w-5 animate-spin" />
								))}
						</button>
					</div>
				</div>
			</form>
		</React.Fragment>
	);
};
export default AddProjectsForm;
