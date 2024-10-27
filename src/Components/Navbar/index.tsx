import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { RootState } from "../../Redux/Reducers";
import { logout } from "../../Redux/Actions/login";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ConfirmationModal from "./confirmation-modal";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const LoginDetails = useSelector((state: RootState) => state.login);
	const Token = localStorage.getItem("asp-portfolio-token");

	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	function handleLogout() {
		dispatch(logout() as any);
		setShowConfirmationModal(false);
	}

	return (
		<React.Fragment>
			<nav className="w-full h-[70px] bg-blue-800 shadow-lg fixed top-0 left-0 right-0 shadow-blue-100 flex items-center justify-between">
				{LoginDetails.token && showConfirmationModal && (
					<ConfirmationModal
						showConfirmationModal={showConfirmationModal}
						setShowConfirmationModal={setShowConfirmationModal}
						handleLogout={handleLogout}
					/>
				)}
				{/* logo-container */}
				<div className="w-[100px] flex items-center space-x-5 cursor-pointer">
					<img
						src="/logo.webp"
						alt=""
						height={60}
						width={80}
						style={{ borderRadius: "50%" }}
					/>
					<h4 className="text-2xl font-bold text-white">Portfolio</h4>
				</div>
				<div className="flex items-center space-x-10 px-10">
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#home">
						<p className="text-white font-bold">Home</p>
					</HashLink>
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#resume">
						<p className="text-white font-bold">Resume</p>
					</HashLink>
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#projects">
						<p className="text-white font-bold">Projects</p>
					</HashLink>
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#skills">
						<p className="text-white font-bold">Skills</p>
					</HashLink>
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#experience">
						<p className="text-white font-bold">Experience</p>
					</HashLink>
					{(LoginDetails?.token || Token) && (
						<button
							onClick={() => setShowConfirmationModal(true)}
							className="bg-red-600 hover:bg-blue-800 text-white px-6 py-2 rounded-md border-none">
							Logout
						</button>
					)}
				</div>
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
