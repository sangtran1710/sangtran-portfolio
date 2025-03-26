import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";

import { faCalendarDays, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBar from "../common/navBar";
import Footer from "../common/footer";

import INFO from "../../data/user";
import SEO from "../../data/seo";

import "./styles/projectDetail.css";

const ProjectDetail = () => {
    const { projectId } = useParams();

    // Find the selected project
    const project = INFO.projects.find((p) => p.id === projectId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="not-found">
                <div className="not-found-content">
                    <h1>Project not found</h1>
                    <Link to="/projects">Back to Projects</Link>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${project.title} | ${INFO.main.title}`}</title>
                <meta name="description" content={project.description} />
                <meta
                    name="keywords"
                    content={SEO.keywords.concat(project.categories).join(", ")}
                />
            </Helmet>

            <div className="page-content">
                <NavBar active="projects" />
                <div className="content-wrapper">
                    <div className="project-detail">
                        <div className="project-detail-header">
                            <h1 className="project-detail-title">{project.title}</h1>
                            <div className="project-detail-meta">
                                <div className="meta-item">
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                    <span>{project.date}</span>
                                </div>
                                <div className="meta-item">
                                    <FontAwesomeIcon icon={faFolder} />
                                    <div className="categories">
                                        {project.categories.map((category, index) => (
                                            <span key={index} className="category-tag">
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {project.video ? (
                            <div className="project-detail-video">
                                <div className="video-container">
                                    <iframe
                                        src={`https://www.youtube-nocookie.com/embed/${project.video}?rel=0`}
                                        title={project.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ) : (
                            <div className="project-detail-landing">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="landing-image"
                                />
                            </div>
                        )}

                        <div className="project-detail-content">
                            <div className="project-description">
                                {project.longDescription
                                    ? project.longDescription
                                          .split("\n")
                                          .map((paragraph, index) => (
                                              <p
                                                  key={index}
                                                  dangerouslySetInnerHTML={{
                                                      __html: paragraph,
                                                  }}
                                              />
                                          ))
                                    : project.description
                                          .split("\n")
                                          .map((paragraph, index) => (
                                              <p key={index}>{paragraph}</p>
                                          ))}
                            </div>

                            {project.techStack && project.techStack.length > 0 && (
                                <div className="project-tech">
                                    <h2>
                                        <span>Technologies Used</span>
                                    </h2>
                                    <div className="tech-stack">
                                        {project.techStack.map((tech, index) => (
                                            <div key={index} className="tech-item">
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {project.contributions && project.contributions.length > 0 && (
                                <div className="project-contributions">
                                    <h2>
                                        <span>Key Contributions</span>
                                    </h2>
                                    <ul>
                                        {project.contributions.map((contribution, index) => {
                                            const type = contribution.type || "technical";
                                            return (
                                                <li
                                                    key={index}
                                                    className={`contribution-${type}`}
                                                >
                                                    {contribution.text}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            
                            {project.link && (
                                <div className="project-links">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link-button"
                                    >
                                        View Project
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="page-footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProjectDetail; 