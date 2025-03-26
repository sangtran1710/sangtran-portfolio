import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Socials from "../components/about/socials";
import Skills from "../components/about/skills";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

export default function About() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>

				{/* OpenGraph tags */}
				<meta property="og:title" content={currentSEO.og.title} />
				<meta property="og:description" content={currentSEO.og.description} />
				<meta property="og:type" content={currentSEO.og.type} />
				<meta property="og:url" content={window.location.href} />
				<meta property="og:image" content={currentSEO.og.image} />
				<meta property="og:site_name" content={INFO.main.title} />

				{/* Twitter Card tags */}
				<meta name="twitter:card" content={currentSEO.twitter.card} />
				<meta name="twitter:title" content={currentSEO.twitter.title} />
				<meta name="twitter:description" content={currentSEO.twitter.description} />
				<meta name="twitter:image" content={currentSEO.twitter.image} />
			</Helmet>

			<div className="page-content">
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className="about-container">
						<div className="about-main">
							<div className="about-right-side">
								<div className="title about-title">
									{INFO.about.title}
								</div>

								<div className="subtitle about-subtitle">
									{INFO.about.description}
								</div>
							</div>

							<div className="about-left-side">
								<div className="about-image-container">
									<div className="about-image-wrapper">
										<img
											src="/images/avatar-hello.png"
											alt="Sang Tran - Technical VFX Artist"
											className="about-image"
										/>
									</div>
								</div>

								<div className="about-socials">
									<Socials />
								</div>
							</div>
						</div>
						
						<div className="about-skills">
							<Skills />
						</div>

						<div className="about-socials-mobile">
							<Socials />
						</div>
						
						{/* Contact section moved from Contact page */}
						<div className="about-contact">
							<div className="title contact-title">
								Let's Get in Touch
							</div>
							
							<div className="subtitle contact-subtitle">
								Feel free to reach out via email or follow me on social media. I typically reply within 24 hours.
							</div>
							
							<div className="contact-links">
								<a href={`mailto:${INFO.main.email}`} className="contact-link">
									<span className="contact-icon">📧</span> {INFO.main.email}
								</a>
								<a href={INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="contact-link">
									<span className="contact-icon">🐦</span> X (Twitter)
								</a>
								<a href={INFO.socials.github} target="_blank" rel="noopener noreferrer" className="contact-link">
									<span className="contact-icon">💻</span> GitHub
								</a>
								<a href={INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
									<span className="contact-icon">💼</span> LinkedIn
								</a>
							</div>
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
