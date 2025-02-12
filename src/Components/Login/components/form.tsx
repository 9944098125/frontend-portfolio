import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Redux/Actions/login";
import { RootState } from "../../../Redux/Reducers";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../Utils/show-toast";
import { Icons } from "../../../Utils/icons";

const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const LoginDetails = useSelector((state: RootState) => state.login);

	function submitLoginForm(data: any) {
		const body = {
			email: data?.email,
			password: data?.password,
		};
		dispatch(login(body) as any);
	}

	useEffect(() => {
		if (LoginDetails?.token || localStorage.getItem("token")) {
			reset();
			showToast("Login Successful", "success");
		}
		if (LoginDetails?.error) {
			showToast("Login Failed", LoginDetails?.error.toString());
		}
	}, [LoginDetails, navigate]);

	return (
		<React.Fragment>
			{/* this component contains a form to login */}
			<div id="loginForm" className="p-5 w-full text-white font-semibold">
				<h3 className="text-[12px] lg:text-2xl text-blue-700 font-bold underline mb-5">
					Login & Edit Your Portfolio details if you are an admin.
				</h3>
				<form onSubmit={handleSubmit(submitLoginForm)}>
					<div className="w-full bg-green-50 mb-5 p-5">
						<label
							htmlFor="email"
							className="block text-gray-700 text-sm font-bold mb-2">
							Email
						</label>
						<input
							type="email"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Invalid email format",
								},
							})}
							id="email"
							className="shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 h-[45px] focus:outline-none focus:shadow-outline"
							placeholder="Enter your email"
						/>
						{/* Error message for email */}
						{errors.email && (
							<p className="text-red-600 text-sm mt-1">
								{String(errors?.email?.message)}
							</p>
						)}
					</div>

					<div className="w-full bg-pink-50 mb-5 p-5">
						<label
							htmlFor="password"
							className="block text-gray-700 text-sm font-bold mb-2">
							Password
						</label>
						<input
							type="password"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters",
								},
								maxLength: {
									value: 10,
									message: "Password cannot exceed 10 characters",
								},
							})}
							id="password"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-[45px] focus:outline-none focus:shadow-outline"
							placeholder="Enter your Password"
						/>
						{/* Error message for password */}
						{errors.password && (
							<p className="text-red-600 text-sm mt-1">
								{String(errors?.password?.message)}
							</p>
						)}
					</div>

					<button
						disabled={LoginDetails?.loading}
						type="submit"
						className="bg-blue-600 border-none h-[45px] hover:bg-blue-800 disabled:bg-blue-500 disabled:cursor-wait rounded-lg w-full flex items-center justify-center space-x-6">
						<span className="text-white font-bold text-14px">Login</span>
						{LoginDetails?.loading && (
							<Icons.Spinner className="animate-spin h-8 w-8 text-white" />
						)}
					</button>
				</form>
			</div>
		</React.Fragment>
	);
};
export default LoginForm;
