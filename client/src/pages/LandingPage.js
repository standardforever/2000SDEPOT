import React from "react";
import { Link } from "react-router-dom";
import "./style/landingpage.css";
import { useTheme } from "../Components/ThemeContext";
import ReactSwitch from "react-switch";

const LandingPage = () => {
	const { isDarkMode, toggleTheme } = useTheme();
	return (
		<div className={isDarkMode ? "dark-mode" : "light-mode"}>
			<section className="About">
				<h1>Welcome to the 2000s DEPOT!</h1>
				<h2>
					{" "}
					A Peak Into The <span>2000s</span> DEPOT?!
				</h2>
				<p>
					"Welcome to 2000s DEPOT, your ultimate destination for all
					things gaming from the iconic era of the 2000s! Dive into
					discussions, debates, and nostalgia-filled conversations
					about your favorite games, consoles, and moments from this
					golden age of gaming. Whether you're reliving the classics
					or discovering hidden gems, join our vibrant community of
					fellow gamers to reminisce, strategize, and share your
					passion for the games that defined a generation."
				</p>
				<button>
					<Link to={"/login"}>Click to Continue</Link>
				</button>
				<div className="switch">
					<label> {isDarkMode ? "Dark-mode" : "Light-mode"}</label>
					<ReactSwitch onChange={toggleTheme} checked={isDarkMode} />
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
