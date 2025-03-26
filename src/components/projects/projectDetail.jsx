import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCalendarDays, 
    faFolder, 
    faUser, 
    faCode, 
    faStar 
} from "@fortawesome/free-solid-svg-icons";

import INFO from "../../data/user";
import SEO from "../../data/seo";

import "./styles/projectDetail.css";

const ProjectDetail = ({ project }) => {
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

    // Get SEO keywords or use an empty array if undefined
    const projectsSeo = SEO.find(item => item.page === "projects") || {};
    const seoKeywords = projectsSeo.keywords || [];
    const projectCategories = project?.categories || [];
    const projectYear = project?.year || project?.date || 'N/A';
    const projectDescription = project?.description || '';
    const projectRole = project?.role || '';

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${project.title} | ${INFO.main.title}`}</title>
                <meta name="description" content={projectDescription} />
                <meta
                    name="keywords"
                    content={seoKeywords.concat(projectCategories).join(", ")}
                />
            </Helmet>

            <div className="project-detail">
                <div className="project-detail-header">
                    <h1 className="project-detail-title">{project.title}</h1>
                    <div className="project-detail-meta">
                        {projectRole && (
                            <div className="meta-item">
                                <FontAwesomeIcon icon={faUser} />
                                <span>{projectRole}</span>
                            </div>
                        )}
                        <div className="meta-item">
                            <FontAwesomeIcon icon={faCalendarDays} />
                            <span>{projectYear}</span>
                        </div>
                        {projectCategories.length > 0 && (
                            <div className="meta-item">
                                <FontAwesomeIcon icon={faFolder} />
                                <div className="categories">
                                    {projectCategories.map((category, index) => (
                                        <span key={index} className="category-tag">
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {project.video ? (
                    <div className="project-detail-video">
                        <div className="video-container">
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${getYoutubeVideoId(project.video)}?rel=0`}
                                title={project.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                ) : project.images && project.images.length > 0 ? (
                    <div className="project-detail-landing">
                        <img
                            src={project.images[0]}
                            alt={project.title}
                            className="landing-image"
                        />
                    </div>
                ) : (
                    <div className="project-detail-landing">
                        <img
                            src={project.thumbnail || project.image}
                            alt={project.title}
                            className="landing-image"
                        />
                    </div>
                )}

                <div className="project-detail-content">
                    <div className="project-description">
                        <h2 className="section-heading">Project Overview</h2>
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
                            : projectDescription
                                  .split("\n")
                                  .map((paragraph, index) => (
                                      <p key={index}>{paragraph}</p>
                                  ))}
                    </div>

                    {project.contributions && project.contributions.length > 0 && (
                        <div className="project-contributions">
                            <h2 className="section-heading">
                                <FontAwesomeIcon icon={faStar} />
                                <span>Key Contributions</span>
                            </h2>
                            <ul className="contributions-list">
                                {project.contributions.map((contribution, index) => {
                                    const type = contribution?.type || "technical";
                                    const text = contribution?.text || "";
                                    return (
                                        <li
                                            key={index}
                                            className={`contribution-${type}`}
                                        >
                                            {text}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {project.techStack && project.techStack.length > 0 && (
                        <div className="project-tech">
                            <h2 className="section-heading">
                                <FontAwesomeIcon icon={faCode} />
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
                    
                    {project.externalLink && (
                        <div className="project-links">
                            <a
                                href={project.externalLink}
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
        </React.Fragment>
    );
};

// Helper function to extract YouTube video ID
function getYoutubeVideoId(url) {
    if (!url) return null;
    
    // Handle already extracted IDs
    if (url.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
        return url;
    }
    
    // Handle YouTube URLs
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
}

export default ProjectDetail; 