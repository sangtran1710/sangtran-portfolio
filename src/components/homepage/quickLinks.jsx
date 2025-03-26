import React from "react";
import { Link } from "react-router-dom";
import INFO from "../../data/user";

import "./styles/quickLinks.css";

const QuickLinks = () => {
	return (
		<div className="quick-links">
			{INFO.homepage.quickLinks.map((link, index) => (
				<Link to={link.route} key={index} className="quick-link-card">
					<div className="quick-link-icon">{link.icon}</div>
					<div className="quick-link-content">
						<div className="quick-link-title">{link.title}</div>
						<div className="quick-link-description">{link.description}</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default QuickLinks; 