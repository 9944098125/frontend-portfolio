import React from "react";
import { Icons } from "../../Utils/icons";

const ContactIcons = () => {
	// Customize these links as per your requirements
	const email = "srinivas72075@gmail.com";
	const githubLink = "https://github.com/9944098125";
	const phoneNumber = "917995643201"; // Use international format without '+'

	return (
		<div>
			<div id="contact" className="w-full p-5">
				<h1 className="text-2xl text-blue-600 font-bold underline mb-5">
					Contacts:
				</h1>
				<div className="flex flex-col lg:flex-row space-y-5 lg:space-x-10 justify-center items-center mb-5 mt-5">
					{/* Email Icon */}
					<div className="flex flex-col items-center justify-center space-y-5 border border-blue-600 rounded-full w-[150px] h-[150px]">
						<a
							href={`mailto:${email}`}
							target="_blank"
							rel="noopener noreferrer"
							className="transition-transform transform hover:scale-125 hover:text-red-500"
							title="Send me an Email">
							<Icons.GoogleMC className="w-14 h-14" />
						</a>
						<p className="text-lg font-medium font-poppins">Gmail</p>
					</div>

					{/* GitHub Icon */}
					<div className="flex flex-col items-center justify-center space-y-5 p-5 border border-blue-600 rounded-full w-[150px] h-[150px]">
						<a
							href={githubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="transition-transform transform hover:scale-125 hover:text-gray-800"
							title="Check out my GitHub">
							<Icons.GitHub className="w-14 h-14" />
						</a>
						<p className="text-lg font-medium">Github</p>
					</div>

					{/* WhatsApp Icon */}
					<div className="flex flex-col items-center justify-center space-y-5 p-5 border border-blue-600 rounded-full w-[150px] h-[150px]">
						<a
							href={`https://wa.me/${phoneNumber}`}
							target="_blank"
							rel="noopener noreferrer"
							className="transition-transform transform hover:scale-125 hover:text-green-600"
							title="Message me on WhatsApp">
							<Icons.Whatsapp className="w-14 h-14" />
						</a>
						<p className="text-lg font-medium">Whatsapp</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactIcons;
