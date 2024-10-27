import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Reducers";
import { uploadResume } from "../../../../Redux/Actions/login";
import { Icons } from "../../../../Utils/icons";

const AddResume = () => {
	const dispatch = useDispatch();
	const UserDetails = useSelector((state: RootState) => state.login);
	const [resumeFile, setResumeFile] = React.useState<string>("");

	const user = localStorage.getItem("asp-portfolio-user")
		? JSON.parse(localStorage.getItem("asp-portfolio-user") || "")
		: null;

	const docs = [{ uri: UserDetails?.user?.resume || resumeFile }];
	const [uploading, setUploading] = useState<boolean>(false);
	const onChangeFile = async (file: File | null) => {
		setUploading(true);
		if (!file) {
			return;
		} else if (file.type === "application/pdf") {
			const resumeData = new FormData();
			resumeData.append("file", file);
			resumeData.append("upload_preset", "save_qa");
			resumeData.append("cloud_name", "dakda5ni3");
			await fetch("https://api.cloudinary.com/v1_1/dakda5ni3/upload", {
				method: "POST",
				body: resumeData,
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					setResumeFile(data?.secure_url);
					setUploading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const submitResume = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const body = { resume: resumeFile };
		dispatch(uploadResume(user?._id, body) as any);
	};

	return (
		<React.Fragment>
			<div className="w-full min-h-screen">
				<form className="flex items-center space-x-10" onSubmit={submitResume}>
					<div className="w-full border-blue-600 border-4 bg-blue-50 rounded-lg p-10">
						<label htmlFor="resumeFile">
							<input
								type="file"
								id="resumeFile"
								onChange={(e: any) => onChangeFile(e.target.files?.[0])}
								style={{ display: "none" }}
							/>
							<p className="text-blue-600 font-bold text-xl">
								Select any PDF file
							</p>
						</label>
					</div>
					<button
						type="submit"
						className="bg-orange-500 hover:bg-orange-700 text-white font-bold border-none rounded-lg px-5 py-4">
						Submit
					</button>
				</form>

				{UserDetails?.user?.resume ? (
					<DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
				) : (
					<div className="flex items-center justify-center w-full">
						<Icons.Spinner className="animate-spin h-10 w-10 text-blue-600" />
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default AddResume;
