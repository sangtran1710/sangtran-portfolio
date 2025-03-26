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

	const filteredProjects = useMemo(() => {
		if (activeFilter === "all") return INFO.projects;
		return INFO.projects.filter(project => 
			project.categories?.includes(activeFilter)
		);
	}, [activeFilter]);

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

			{filteredProjects.map((project, index) => (
				<div className="all-projects-project" key={index}>
					<Project
						thumbnail={project.thumbnail}
						title={project.title}
						role={project.role}
						year={project.year}
						description={project.description}
						contributions={project.contributions}
						techStack={project.techStack}
						link={project.link}
					/>
				</div>
			))}
		</div>
	);
};

export default AllProjects;
