import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faCalendar, 
	faStar, 
	faCode,
	faWrench,
	faMagic,
	faBolt
} from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";

const Project = (props) => {
	const { 
		thumbnail,
		title, 
		role,
		year,
		description, 
		contributions,
		techStack,
		link 
	} = props;

	const contributionIcons = {
		technical: faWrench,
		effects: faMagic,
		impact: faBolt
	};

	return (
		<div className="project">
			<Link to={link}>
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

						<div className="project-description">{description}</div>

						<div className="project-section">
							<div className="section-title">
								<FontAwesomeIcon icon={faStar} />
								<span>Key Contributions</span>
							</div>
							<ul className="project-contributions">
								{contributions.map((contribution, index) => (
									<li key={index}>
										<FontAwesomeIcon 
											icon={contributionIcons[contribution.type] || faMagic} 
											className={`contribution-icon ${contribution.type}`}
										/>
										<span>{contribution.text}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="project-section">
							<div className="section-title">
								<FontAwesomeIcon icon={faCode} />
								<span>Tech Stack</span>
							</div>
							<div className="project-tech-stack">
								{techStack.map((tech, index) => (
									<span key={index} className="tech-item">
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Project;
