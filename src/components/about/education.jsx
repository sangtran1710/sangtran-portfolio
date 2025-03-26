import React from "react";
import INFO from "../../data/user";

import "./styles/education.css";

const Education = () => {
	return (
		<div className="education-container">
			<div className="education-title">{INFO.education.title}</div>
			<div className="education-description">{INFO.education.description}</div>
			
			<div className="degrees-container">
				{INFO.education.degrees.map((degree, index) => (
					<div className="degree-item" key={index}>
						<div className="degree-school">{degree.school}</div>
						<div className="degree-name">{degree.degree}</div>
						<div className="degree-year">{degree.year}</div>
						<div className="degree-description">{degree.description}</div>
						{degree.tools && (
							<div className="degree-tools">
								<span className="tools-label">Tools: </span>
								{degree.tools}
							</div>
						)}
						{degree.gpa && (
							<div className="degree-gpa">
								<span className="gpa-label">GPA: </span>
								{degree.gpa}
							</div>
						)}
					</div>
				))}
			</div>

			<div className="certifications-title">Certifications</div>
			<div className="certifications-container">
				{INFO.education.certifications.map((cert, index) => (
					<div className="certification-item" key={index}>
						<div className="certification-name">{cert.name}</div>
						{cert.score && (
							<div className="certification-score">{cert.score}</div>
						)}
						<div className="certification-year">{cert.year}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Education; 