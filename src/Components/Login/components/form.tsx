import React from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	function submitLoginForm(data: any) {
		console.log(data);
	}

	return (
		<React.Fragment>
			{/* this component contains a form to login */}
			<div id="loginForm" className="p-5 w-full text-white font-semibold">
				<h3 className="text-2xl text-blue-700 font-bold underline mb-5">
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
						type="submit"
						className="bg-blue-600 border-none h-[45px] hover:bg-blue-800 rounded-lg w-full">
						Login
					</button>
				</form>
			</div>
		</React.Fragment>
	);
};

export default LoginForm;
