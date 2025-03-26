import React from "react";
import { Link } from "react-router-dom";

import "./styles/navBar.css";
import INFO from "../../data/user";

const NavBar = () => {
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<div className="nav-container">
			<div className="nav-content">
				<div className="nav-left">
					<Link to="/" className="nav-logo" onClick={scrollToTop}>
						Sang Tran
					</Link>
				</div>

				<nav className="nav-center">
					<Link to="/" className="nav-link">Home</Link>
					<Link to="/about" className="nav-link">About</Link>
					<Link to="/projects" className="nav-link">Projects</Link>
					<Link to="/articles" className="nav-link">Articles</Link>
					<Link to="/contact" className="nav-link">Contact</Link>
				</nav>

				<div className="nav-right">
					<a
						href={INFO.socials.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="nav-social-link"
					>
						LinkedIn
					</a>
					<a
						href={INFO.socials.resume}
						target="_blank"
						rel="noopener noreferrer"
						className="nav-social-link resume"
					>
						View Resume
					</a>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
