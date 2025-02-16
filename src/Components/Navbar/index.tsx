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
			<nav className="w-full h-[70px] z-[199] bg-blue-600 shadow-lg fixed top-0 left-0 right-0 shadow-blue-100 flex items-center justify-between">
				{LoginDetails.token && showConfirmationModal && (
					<ConfirmationModal
						showConfirmationModal={showConfirmationModal}
						setShowConfirmationModal={setShowConfirmationModal}
						handleLogout={handleLogout}
					/>
				)}
				{/* logo-container */}
				<div className="flex items-center space-x-5 px-5 cursor-pointer">
					<img
						src="/asp.png"
						alt=""
						height={50}
						width={50}
						style={{ borderRadius: "50%" }}
					/>
					<h4 className="text-[23px] lg:text-[36px] font-bold text-white">
						{LoginDetails?.user?.name}
					</h4>
				</div>
				<div className="hidden lg:flex items-center space-x-10 px-10">
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
					{!(LoginDetails?.token || Token) && (
						<HashLink
							scroll={(el) =>
								el.scrollIntoView({ behavior: "auto", block: "end" })
							}
							to="#contact">
							<p className="text-white font-bold">Contacts</p>
						</HashLink>
					)}
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
