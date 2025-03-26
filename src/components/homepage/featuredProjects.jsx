import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import INFO from "../../data/user";
import "./styles/featuredProjects.css";

const FeaturedProjects = () => {
	const [imagesLoaded, setImagesLoaded] = useState({});
	const allProjects = INFO.projects || [];

	const handleImageLoad = (index) => {
		setImagesLoaded(prev => ({
			...prev,
			[index]: true
		}));
	};

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		arrows: true,
		fade: true,
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	};

	return (
		<div className="featured-projects">
			<h2>Featured Projects</h2>
			<div className="featured-projects-container">
				<Slider {...settings}>
					{allProjects.map((project, index) => (
						<div key={index} className="featured-project-slide">
							<div className="featured-project-card">
								<Link to={project.link || "/projects"} className="featured-project-link">
									<div className={`featured-project-image-container ${imagesLoaded[index] ? 'loaded' : ''}`}>
										<img
											src={project.thumbnail || project.logo}
											alt={project.imageAlt || project.title}
											className="featured-project-image"
											loading={index === 0 ? "eager" : "lazy"}
											onLoad={() => handleImageLoad(index)}
										/>
									</div>
									<div className="featured-project-content">
										<h3 className="featured-project-title">{project.title}</h3>
										<p className="featured-project-year">{project.linkText}</p>
										<p className="featured-project-description">
											{project.description}
										</p>
									</div>
								</Link>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default FeaturedProjects; 