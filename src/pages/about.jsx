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
								Let's Get in Touch: Ways to Connect with Me
							</div>
							
							<div className="subtitle contact-subtitle">
								Thank you for your interest in getting in touch with
								me. I welcome your feedback, questions, and
								suggestions. If you have a specific question or
								comment, please feel free to email me directly at
								&nbsp;{" "}
								<a href={`mailto:${INFO.main.email}`}>
									{INFO.main.email}
								</a>
								. I make an effort to respond to all messages within
								24 hours, although it may take me longer during busy
								periods. Alternatively, you can use the contact form
								on my website to get in touch. Simply fill out the
								required fields and I'll get back to you as soon as
								possible. Finally, if you prefer to connect on
								social media, you can find me on{" "}
								<a
									href={INFO.socials.twitter}
									target="_blank"
									rel="noreferrer"
								>
									X (Twitter)
								</a>
								, {" "}
								<a
									href={INFO.socials.github}
									target="_blank"
									rel="noreferrer"
								>
									GitHub
								</a>
								, or {" "}
								<a
									href={INFO.socials.linkedin}
									target="_blank"
									rel="noreferrer"
								>
									LinkedIn
								</a>
								. I post regular updates and engage with my
								followers there, so don't hesitate to reach out.
								Thanks again for your interest, and I look forward
								to hearing from you!
							</div>
							
							<div className="about-contact-socials">
								<Socials />
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
