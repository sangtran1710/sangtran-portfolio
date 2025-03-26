import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import ProjectDetail from "../components/projects/projectDetail";
import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projectDetail.css";

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    // Find the project using multiple match strategies
    const project = INFO.projects.find(p => {
        // Check for direct ID match (if we added id to projects)
        if (p.id === projectId) return true;
        
        // Check for slug in link property
        if (p.link && p.link.endsWith('/' + projectId)) return true;
        
        // Check against slug created from title
        const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return slug === projectId;
    });

    if (!project) {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{`Project Not Found | ${INFO.main.title}`}</title>
                </Helmet>
                <div className="page-content">
                    <NavBar active="projects" />
                    <div className="content-wrapper">
                        <div className="not-found">
                            <h1>Project not found</h1>
                            <p>Sorry, we couldn't find the project you're looking for.</p>
                            <Link to="/projects" className="back-link">Back to Projects</Link>
                        </div>
                        <div className="page-footer">
                            <Footer />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    // Get SEO keywords or use an empty array if undefined
    const projectsSeo = SEO.find(item => item.page === "projects") || {};
    const seoKeywords = projectsSeo.keywords || [];
    const projectCategories = project?.categories || [];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${project.title} | ${INFO.main.title}`}</title>
                <meta name="description" content={project.description} />
                <meta
                    name="keywords"
                    content={seoKeywords.concat(projectCategories).join(", ")}
                />
            </Helmet>
            <div className="page-content">
                <NavBar active="projects" />
                <div className="content-wrapper">
                    <ProjectDetail project={project} />
                    <div className="page-footer">
                        <Footer />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProjectDetailPage; 