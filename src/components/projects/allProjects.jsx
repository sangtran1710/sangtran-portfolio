import React, { useState, useMemo } from "react";
import Project from "./project";

import INFO from "../../data/user";

import "./styles/allProjects.css";

const AllProjects = () => {
	const [activeFilter, setActiveFilter] = useState("all");

	const filters = [
		{ id: "all", label: "All Projects" },
		{ id: "aaa", label: "AAA Games" },
		{ id: "cinematic", label: "Cinematics" },
		{ id: "blockchain", label: "Blockchain Games" },
		{ id: "realtime", label: "Real-time VFX" }
	];

	// Ensure INFO.projects exists and is an array
	const projects = Array.isArray(INFO?.projects) ? INFO.projects : [];

	const filteredProjects = useMemo(() => {
		if (activeFilter === "all") return projects;
		return projects.filter(project => 
			Array.isArray(project?.categories) && 
			project.categories.some(category => 
				typeof category === 'string' &&
				category.toLowerCase() === activeFilter.toLowerCase()
			)
		);
	}, [activeFilter, projects]);

	// Check if there are no projects matching the filter
	const noProjectsFound = filteredProjects.length === 0;

	return (
		<div className="all-projects-container">
			<div className="all-projects-header">
				<div className="projects-filter">
					{filters.map(filter => (
						<button 
							key={filter.id}
							className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
							onClick={() => setActiveFilter(filter.id)}
						>
							{filter.label}
						</button>
					))}
				</div>
			</div>

			{noProjectsFound ? (
				<div className="no-projects-message">
					<p>No projects found matching this filter.</p>
					<button 
						className="filter-button"
						onClick={() => setActiveFilter("all")}
					>
						Show All Projects
					</button>
				</div>
			) : (
				filteredProjects.map((project, index) => {
					// Safely extract project data with defaults
					const {
						thumbnail = '',
						title = 'Untitled Project',
						role = '',
						year = '',
						description = '',
						link = ''
					} = project || {};

					return (
						<div className="all-projects-project" key={index}>
							<Project
								thumbnail={thumbnail}
								title={title}
								role={role}
								year={year}
								description={description}
								link={link}
							/>
						</div>
					);
				})
			)}
		</div>
	);
};

export default AllProjects;
