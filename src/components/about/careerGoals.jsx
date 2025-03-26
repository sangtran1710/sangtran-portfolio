import React from "react";
import INFO from "../../data/user";

import "./styles/careerGoals.css";

const CareerGoals = () => {
	return (
		<div className="career-goals-container">
			<div className="career-goals-title">{INFO.careerGoals.title}</div>
			<div className="career-goals-description">{INFO.careerGoals.description}</div>
			
			<div className="career-goals-focus">
				<div className="focus-title">Key Focus Areas:</div>
				<ul className="focus-list">
					{INFO.careerGoals.focus.map((item, index) => (
						<li key={index} className="focus-item">
							{item}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CareerGoals; 