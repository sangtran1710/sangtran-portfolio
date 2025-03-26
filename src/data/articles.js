import React from "react";

function article_1() {
	return {
		date: "15 March 2024",
		title: "Bridging Code and Creativity in AAA Game Production",
		description:
			"Exploring the synergy between technical implementation and artistic vision in modern game development. A deep dive into how technical artists can effectively bridge the gap between programmers and artists while maintaining creative excellence.",
		keywords: [
			"Technical Art",
			"Game Development",
			"AAA Production",
			"VFX Pipeline",
			"Creative Technology",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.article-image {
					max-width: 100%;
					height: auto;
					border-radius: 8px;
					margin: 20px 0;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						Read the full article on Medium to learn about bridging the gap between technical implementation and creative vision in AAA game development.
					</div>
					<a 
						href="https://medium.com/@tranminhsang/bridging-code-and-creativity-in-aaa-game-production-2024" 
						target="_blank"
						rel="noopener noreferrer"
						className="article-link"
					>
						Read on Medium →
					</a>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "1 March 2024",
		title: "Python Automation in VFX Pipelines: Lessons Learned",
		description:
			"Practical insights from implementing Python-based automation tools in AAA game VFX pipelines. Sharing key strategies for optimizing artist workflows and maintaining efficiency across large-scale projects.",
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.article-link {
					display: inline-block;
					margin-top: 20px;
					padding: 10px 20px;
					background-color: #f4f4f5;
					color: var(--primary-color);
					text-decoration: none;
					border-radius: 5px;
					transition: background-color 0.2s ease;
				}

				.article-link:hover {
					background-color: #e4e4e7;
				}
				`,
		keywords: [
			"Python Automation",
			"VFX Pipeline",
			"Technical Art",
			"Workflow Optimization",
			"Game Development",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						Discover how Python automation can revolutionize VFX pipelines in game development. Read the full article on Medium.
					</div>
					<a 
						href="https://medium.com/@tranminhsang/python-automation-in-vfx-pipelines-lessons-learned-2024" 
						target="_blank"
						rel="noopener noreferrer"
						className="article-link"
					>
						Read on Medium →
					</a>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2];

export default myArticles;
