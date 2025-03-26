import React from "react";
import INFO from "../../data/user";

import "./styles/experience.css";

const Experience = () => {
	return (
		<div className="experience-container">
			<div className="experience-title">{INFO.experience.title}</div>
			<div className="experience-description">{INFO.experience.description}</div>
			
			<div className="experiences-wrapper">
				{INFO.experience.experiences.map((exp, index) => (
					<div className="experience-card" key={index}>
						<div className="experience-header">
							<div className="experience-company">{exp.company}</div>
							<div className="experience-duration">{exp.duration}</div>
						</div>
						
						<div className="experience-role">{exp.role}</div>
						
						<ul className="experience-responsibilities">
							{exp.responsibilities.map((resp, respIndex) => (
								<li key={respIndex}>{resp}</li>
							))}
						</ul>
						
						{exp.technologies && (
							<div className="experience-technologies">
								<span className="technologies-label">Technologies: </span>
								{exp.technologies}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Experience; 