import React, { useState, useEffect } from "react";
import ReactSwitch from "react-switch";
import { useTheme } from "./ThemeContext";
import GameLibraryList from "./GameLibraryList";
import { Link } from "react-router-dom";

const GameLibrary = () => {
	const { isDarkMode, toggleTheme } = useTheme();
	const [games, setGames] = useState([]);
	const token =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkZWZhdWx0X3VzZXIifQ.hWBCFTI8zh4jcMuuxoR9bUfl_PgUYh258AnH9-EhYXs";

	useEffect(() => {
		fetchGames();
	}, []);

	const fetchGames = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/api/games", {
				method: "GET",
				headers: {
					Authorization: token,
				},
			});
			const data = await response.json();
			console.log(data);
			setGames(data);
		} catch (error) {
			console.error("Error fetching games", error);
		}
	};

	return (
		<div className={isDarkMode ? "dark-mode" : "light-mode"}>
			<h1>GameLibrary</h1>

			<div className="switch">
				<label> {!isDarkMode ? "Light Mode" : "Dark Mode"}</label>
				<ReactSwitch onChange={toggleTheme} checked={isDarkMode} />
			</div>
			<button>
				<Link to={"/games/post"}>Click to Post Game</Link>
			</button>
			<button>
				<Link to={"/games/comments"}>Click to post a comment</Link>
			</button>
			<GameLibraryList games={games} />
		</div>
	);
};

export default GameLibrary;
