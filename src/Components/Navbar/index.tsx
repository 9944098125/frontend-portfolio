import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { RootState } from "../../Redux/Reducers";
import { logout } from "../../Redux/Actions/login";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const LoginDetails = useSelector((state: RootState) => state.login);
	const Token = localStorage.getItem("asp-portfolio-token");

	const [showConfirmationModal, setShowConfirmationModal] = useState(true);

	function handleLogout() {
		dispatch(logout() as any);
		setShowConfirmationModal(false);
	}

	return (
		<React.Fragment>
			<nav className="w-full h-[70px] bg-white shadow-lg fixed top-0 left-0 right-0 shadow-blue-100 flex items-center justify-between">
				<Modal
					open={showConfirmationModal}
					onClose={() => setShowConfirmationModal(false)}
					center>
					<div className="p-10">
						<h3 className="text-3xl font-bold mb-5">
							Are you sure you want to Logout ?
						</h3>
						<div className="flex justify-between items-center px-5">
							<button
								onClick={handleLogout}
								className="bg-green-600 text-white px-6 py-2 hover:bg-green-800 border-none rounded-md">
								Yes
							</button>
							<button
								onClick={() => setShowConfirmationModal(false)}
								className="bg-red-600 text-white px-6 py-2 hover:bg-red-800 border-none rounded-md">
								No
							</button>
						</div>
					</div>
				</Modal>
				{/* logo-container */}
				<div className="w-[100px] flex items-center space-x-5 cursor-pointer">
					<img
						src="/logo.webp"
						alt=""
						height={60}
						width={80}
						style={{ borderRadius: "50%" }}
					/>
					<h4 className="text-2xl font-bold text-blue-600">Portfolio</h4>
				</div>
				<div className="flex items-center space-x-10 px-10">
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#home">
						Home
					</HashLink>
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#resume">
						Resume
					</HashLink>
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#projects">
						Projects
					</HashLink>
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#skills">
						Skills
					</HashLink>
					<HashLink
						scroll={(el) =>
							el.scrollIntoView({ behavior: "auto", block: "end" })
						}
						to="#experience">
						Experience
					</HashLink>
					{(LoginDetails?.token || Token) && (
						<button
							onClick={() => setShowConfirmationModal(true)}
							className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-md border-none">
							Logout
						</button>
					)}
				</div>
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
