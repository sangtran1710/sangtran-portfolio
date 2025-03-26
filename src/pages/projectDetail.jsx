import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import ProjectDetail from "../components/projects/projectDetail";
import INFO from "../data/user";

import "./styles/projectDetail.css";

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    
    // Find the project by matching the URL-friendly version of the title
    const project = INFO.projects.find(p => 
        p.link === `/projects/${projectId}` || 
        p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === projectId
    );

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <React.Fragment>
            <NavBar />
            <div className="page-content">
                <ProjectDetail project={project} />
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default ProjectDetailPage; 