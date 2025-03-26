import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";

const Project = (props) => {
	const { 
		thumbnail = '',
		title = 'Untitled Project', 
		role = '',
		year = '',
		description = '', 
		link = '' 
	} = props || {};

	// Generate a project URL if link is missing or not properly formatted
	const getProjectUrl = () => {
		// If link is already a valid path starting with /projects/, use it
		if (link && link.startsWith("/projects/")) {
			return link;
		}
		
		// Otherwise, generate a URL-friendly slug from the title
		const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
		return `/projects/${slug}`;
	};

	// Get a short description (first sentence or first 80 characters)
	const getShortDescription = () => {
		if (!description) return '';
		
		// Try to get the first sentence
		const firstSentence = description.split('.')[0];
		
		// If it's too long, truncate it
		if (firstSentence.length > 80) {
			return firstSentence.substring(0, 80) + '...';
		}
		
		return firstSentence;
	};

	return (
		<div className="project">
			<Link to={getProjectUrl()}>
				<div className="project-container">
					<div className="project-thumbnail">
						<img src={thumbnail} alt={title} loading="lazy" />
					</div>
					
					<div className="project-content">
						<div className="project-header">
							<h3 className="project-title">{title}</h3>
							<span className="project-role">{role}</span>
						</div>

						<div className="project-year">
							<FontAwesomeIcon icon={faCalendar} />
							<span>{year}</span>
						</div>

						{description && <div className="project-description">{getShortDescription()}</div>}
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Project;
