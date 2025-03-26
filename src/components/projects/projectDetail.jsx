import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCalendar,
    faUser,
    faTags,
    faTools
} from "@fortawesome/free-solid-svg-icons";

import "./styles/projectDetail.css";

const ProjectDetail = ({ project }) => {
    const {
        title,
        role,
        year,
        description,
        categories,
        techStack,
        contributions,
        video
    } = project;

    // Extract video ID from YouTube URL
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };

    const embedUrl = getYouTubeEmbedUrl(video);

    return (
        <div className="project-detail">
            <div className="project-detail-header">
                <h1 className="project-detail-title">{title}</h1>
                
                <div className="project-detail-meta">
                    <div className="meta-item">
                        <FontAwesomeIcon icon={faUser} />
                        <span>{role}</span>
                    </div>
                    <div className="meta-item">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{year}</span>
                    </div>
                    <div className="meta-item">
                        <FontAwesomeIcon icon={faTags} />
                        <div className="categories">
                            {categories.map((category, index) => (
                                <span key={index} className="category-tag">
                                    {category}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {embedUrl ? (
                <div className="project-detail-video">
                    <div className="video-container">
                        <iframe
                            src={embedUrl}
                            title={`${title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            ) : (
                <div className="project-detail-landing">
                    <img 
                        src={project.thumbnail}
                        alt={`${title} Landing Visual`}
                        className="landing-image"
                        loading="lazy"
                    />
                </div>
            )}

            <div className="project-detail-content">
                <div className="project-description">
                    <p>{description}</p>
                </div>

                <div className="project-tech">
                    <h2>
                        <FontAwesomeIcon icon={faTools} />
                        <span>Technologies Used</span>
                    </h2>
                    <div className="tech-stack">
                        {techStack.map((tech, index) => (
                            <span key={index} className="tech-item">{tech}</span>
                        ))}
                    </div>
                </div>

                <div className="project-contributions">
                    <h2>Key Contributions</h2>
                    <ul>
                        {contributions.map((contribution, index) => (
                            <li key={index} className={`contribution-${contribution.type}`}>
                                {contribution.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail; 