import React from "react";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
	return (
		<React.Fragment>
			<nav className="w-full h-[70px] bg-white shadow-lg fixed top-0 left-0 right-0 shadow-blue-100 flex items-center justify-between">
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
				</div>
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
