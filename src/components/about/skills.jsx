import React from "react";
import INFO from "../../data/user";

import "./styles/skills.css";

const Skills = () => {
	return (
		<div className="skills-container">
			<div className="skills-title">{INFO.skills.title}</div>
			<div className="skills-description">{INFO.skills.description}</div>
			
			<div className="skills-grid">
				{INFO.skills.groups.map((group, index) => (
					<div className="skill-group" key={index}>
						<div className="skill-group-title">{group.name}</div>
						<div className="skill-group-list">
							{group.skills.map((skill, skillIndex) => (
								<div className="skill-item" key={skillIndex}>
									{skill}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Skills; 