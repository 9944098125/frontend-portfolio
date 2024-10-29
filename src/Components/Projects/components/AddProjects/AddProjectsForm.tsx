import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
	createProject,
	updateProject,
} from "../../../../Redux/Actions/projects";
import { RootState } from "../../../../Redux/Reducers";
import { Icons } from "../../../../Utils/icons";

const AddProjectsForm = ({ showAddForm, setShowAddForm }: any) => {
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
		if (showAddForm?._id) {
			dispatch(updateProject(body, showAddForm?._id) as any);
		} else {
			dispatch(createProject(body, user?._id) as any);
		}
		setShowAddForm({ bool: false, _id: "" });
	};

	useEffect(() => {
		if (showAddForm) {
			const selectedProject = ProjectDetails?.projects?.filter(
				(d) => d?._id === showAddForm?._id
			)?.[0];
			form.setValue("title", selectedProject?.title);
			form.setValue("description", selectedProject?.description);
			form.setValue("githubLink", selectedProject?.githubLink);
			form.setValue("liveLink", selectedProject?.liveLink);
			setTechStack(selectedProject?.techStack);
			setUploadedUrls(selectedProject?.images);
		}
	}, [showAddForm, ProjectDetails?.project]);

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
			setUploadedUrls((prevUrls) => [
				...(prevUrls || []),
				...successfulUploads,
			]);
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

	const handleRemoveImage = (index: number) => {
		setUploadedUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
	};

	return (
		<React.Fragment>
			<form
				className="w-full relative"
				onSubmit={form.handleSubmit(submitData)}>
				<div
					onClick={() => setShowAddForm({ bool: false, _id: "" })}
					className="absolute right-10 top-10 cursor-pointer">
					X
				</div>
				<div className="p-6 w-full">
					<div className="grid grid-cols-12 gap-6 p-10">
						<div className="col-span-6">
							<div className="w-full mb-10">
								<input
									value={form.watch("title")}
									type="text"
									placeholder="Project Title"
									className="w-full p-2 rounded-lg outline-blue-500 border border-blue-500 h-[45px]"
									{...form.register("title")}
								/>
							</div>
							<div className="w-full">
								<Select
									value={techStack?.map((d) => ({
										value: d,
										label: d,
									}))}
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
								value={form.watch("description")}
								rows={6}
								placeholder="Description"
								{...form.register("description")}
								className="w-full p-5 border border-blue-500 rounded-lg outline-blue-500"
							/>
						</div>

						<div className="col-span-6">
							<div className="w-full mb-10">
								<input
									value={form.watch("githubLink")}
									type="text"
									placeholder="Github Link"
									className="w-full p-2 rounded-lg outline-blue-500 border border-blue-500 h-[45px]"
									{...form.register("githubLink")}
								/>
							</div>
							<div className="w-full mb-10">
								<input
									value={form.watch("liveLink")}
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
								<div className="flex flex-wrap gap-5">
									{uploadedUrls?.map((url, idx) => {
										return (
											<div key={idx} className="relative mt-5">
												<p
													onClick={() => handleRemoveImage(idx)}
													className="absolute right-[-15px] cursor-pointer top-[-15px] bg-red-600 text-white h-5 w-5 flex items-center justify-center rounded-full">
													x
												</p>
												<img src={url} alt="" height={50} width={50} />
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<button
							disabled={uploading || ProjectDetails?.loading}
							type="submit"
							className="bg-blue-500 flex items-center space-x-5 rounded-lg hover:bg-blue-700 px-5 py-2 border-none text-white font-bold">
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
