import React from "react";
import { Link } from "react-router-dom";

import INFO from "../../data/user";
import "./styles/hero.css";

const Hero = () => {
	return (
		<div className="hero-container">
			<div className="hero-content">
				<div className="hero-text">
					<div className="hero-title">
						{INFO.homepage.title}
					</div>
					<div className="hero-subtitle">
						Hi there! I'm Sang, a VFX artist passionate about blending artistry with technical innovation. 
						I specialize in creating stunning visual effects for AAA games and cinematic experiences, 
						always pushing the boundaries of what's possible in real-time graphics.
					</div>
					<div className="hero-buttons">
						<Link to="/projects" className="hero-button primary">
							View Projects
						</Link>
						<Link to="/contact" className="hero-button secondary">
							Get in Touch
						</Link>
					</div>
				</div>
				<div className="hero-image">
					<div className="hero-image-container">
						<img 
							src="/images/avatar-hello.png"
							alt="Sang Tran - Technical VFX Artist"
							className="hero-avatar"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero; 