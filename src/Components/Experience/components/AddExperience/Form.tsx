import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import {
	createExperience,
	updateExperience,
} from "../../../../Redux/Actions/experience";
import { RootState } from "../../../../Redux/Reducers";

type Props = {
	showForm: { bool: boolean; _id: string };
	setShowForm: React.Dispatch<
		React.SetStateAction<{
			bool: boolean;
			_id: string;
		}>
	>;
};
const AddExperienceForm = (props: Props) => {
	const { showForm, setShowForm } = props;
	const form = useForm();
	const dispatch = useDispatch();

	const ExperiencesState = useSelector((state: RootState) => state.experiences);

	const user = localStorage.getItem("asp-portfolio-user")
		? JSON.parse(localStorage.getItem("asp-portfolio-user") as string)
		: null;

	const animatedComponents = makeAnimated();
	const [startDate, setStartDate] = React.useState<Date | null>(null);
	const [endDate, setEndDate] = React.useState<Date | null>(null);
	const [techStack, setTechStack] = React.useState<string[]>([]);
	const submitExpForm = (data: any) => {
		const body = {
			company: data?.companyName,
			role: data?.role,
			startDate: startDate ?? undefined,
			endDate: endDate ?? undefined,
			experienceSummary: data?.summary,
			technologiesWorkedOn: techStack,
			responsibilities: data?.responsibilities,
		};
		if (showForm?._id) {
			dispatch(updateExperience(showForm?._id, body) as any);
		} else {
			dispatch(createExperience(body, user?._id) as any);
		}
		setShowForm({ bool: false, _id: "" });
	};

	const roles = [
		"Frontend Developer",
		"Backend Developer",
		"Full Stack Developer",
		"DevOps Engineer",
		"Data Scientist",
		"Machine Learning Engineer",
		"Cloud Engineer",
		"Cybersecurity Engineer",
		"UI/UX Designer",
		"Product Manager",
		"Project Manager",
		"Quality Assurance Engineer",
		"Technical Writer",
		"Technical Support Engineer",
		"Network Administrator",
		"Database Administrator",
		"IT Manager",
		"IT Consultant",
		"IT Director",
		"IT Security Analyst",
		"IT Support Specialist",
		"IT Project Manager",
		"IT Operations Manager",
		"IT Infrastructure Manager",
		"IT Service Manager",
		"IT Service Delivery Manager",
		"IT Service Desk Manager",
		"IT Service Desk Analyst",
		"IT Service Desk Supervisor",
		"IT Service Desk Team Lead",
		"IT Service Desk Team Member",
		"IT Service Desk Team Coordinator",
		"IT Service Desk Team Assistant",
		"IT Service Desk Team Intern",
		"IT Service Desk Team Trainee",
		"IT Service Desk Team Apprentice",
	];

	const options = [
		{ value: "reactJs", label: "ReactJS" },
		{ value: "nodeJs", label: "NodeJS" },
		{ value: "react native", label: "React Native" },
		{ value: "bootstrap", label: "Bootstrap" },
		{ value: "tailwind", label: "TailwindCSS" },
		{ value: "mui", label: "MUI" },
		{ value: "kotlin", label: "Kotlin" },
		{ value: "mongoDb", label: "MongoDB" },
		{ value: "expressJs", label: "ExpressJS" },
		{ value: "nextJs", label: "NextJS" },
		{ value: "redux core", label: "Redux Core" },
		{ value: "redux toolkit query", label: "Redux Toolkit Query" },
	];

	useEffect(() => {
		if (showForm?._id) {
			const selectedExperience = ExperiencesState?.experiences?.filter(
				(d) => d?._id === showForm?._id
			)?.[0];
			form.setValue("companyName", selectedExperience?.company);
			form.setValue("role", selectedExperience?.role);
			form.setValue("summary", selectedExperience?.experienceSummary);
			form.setValue("responsibilities", selectedExperience?.responsibilities);
			setStartDate(new Date(selectedExperience?.startDate));
			setEndDate(new Date(selectedExperience?.endDate));
			setTechStack(selectedExperience?.technologiesWorkedOn);
		}
	}, [showForm?._id]);

	const handleChangeTechStack = (
		selectedOptions: readonly { value: string; label: string }[]
	) => {
		const selectedCategories = selectedOptions.map((option) => option.value);
		setTechStack(selectedCategories);
	};

	return (
		<React.Fragment>
			<div className="border border-green-500 rounded-lg p-5">
				<form className="w-full" onSubmit={form.handleSubmit(submitExpForm)}>
					<div className="flex items-center space-x-5 w-full">
						<div className="w-1/2 p-2">
							<label htmlFor="company">Company</label>
							<input
								type="text"
								id="company"
								className="w-full h-[45px] border border-blue-500 rounded-md"
								{...form.register("companyName")}
							/>
						</div>
						<div className="w-1/2 p-2">
							<label htmlFor="role">Role</label>
							<select
								id="role"
								{...form.register("role")}
								value={form.watch("role")}
								className="h-[45px] w-full rounded-md border border-blue-500">
								{roles?.map((role, idx) => {
									return (
										<option key={idx} value={role}>
											{role}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className="flex items-center space-x-5">
						<div className="w-1/2 p-2 flex flex-col">
							<label htmlFor="startDate">Start Date</label>
							<DatePicker
								id="startDate"
								selected={startDate}
								onChange={(date: Date | null) => setStartDate(date)}
								className="h-[45px] w-full border border-blue-500 rounded-md"
							/>
						</div>

						<div className="w-1/2 p-2 flex flex-col">
							<label htmlFor="endDate">End Date</label>
							<DatePicker
								id="endDate"
								selected={endDate}
								onChange={(date: Date | null) => setEndDate(date)}
								className="h-[45px] w-full border border-blue-500 rounded-md"
							/>
						</div>
					</div>
					<div className="w-full flex items-center space-x-5">
						<div className="p-2 w-1/2">
							<label htmlFor="experienceSummary">Experience Summary</label>
							<textarea
								rows={5}
								className="border border-blue-500 rounded-md w-full"
								{...form.register("summary")}
							/>
						</div>
						<div className="w-1/2 p-2">
							<div className="w-full">
								<label htmlFor="workedOn">Technologies worked On</label>
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
									className="w-full border border-blue-500 rounded-md"
								/>
							</div>
						</div>
					</div>

					<div className="w-full p-2">
						<label htmlFor="responsibilities">Responsibilities</label>
						<textarea
							rows={10}
							className="w-full border border-blue-500 rounded-md"
							{...form.register("responsibilities")}
						/>
					</div>

					<button
						type="submit"
						className="bg-blue-600 text-white hover:bg-blue-800 border-none rounded-md px-5 py-2">
						Submit
					</button>
				</form>
			</div>
		</React.Fragment>
	);
};
export default AddExperienceForm;
