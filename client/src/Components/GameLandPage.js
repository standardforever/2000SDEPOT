import React, { useState, useEffect, useContext } from "react";
import GameLibraryList from "./GameLibraryList";
import GameComment from "./GameComment";
import Search from "./Search";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../App";

function GameLandPage() {
	const navigate = useNavigate();
	const [games, setGames] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredGames, setFilteredGames] = useState([]);
	const [filteredGameComments, setFilteredGameComments] = useState([]);
	const { theme, toggleTheme } = useContext(ThemeContext);

	useEffect(() => {
		fetch("/games")
			.then((resp) => resp.json())
			.then((data) => setGames(data));
	}, []);

	useEffect(() => {
		const filtered = games.filter((game) =>
			game.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredGames(filtered);
	}, [searchQuery, games]);

	const handleSearch = (query) => {
		setSearchQuery(query);
	};
	const handleDelete = (new_game_comment_Id) => {
		fetch(`/games/${new_game_comment_Id}`, {
			method: "DELETE",
		}).then((resp) => {
			if (resp.ok) {
				setFilteredGames((originalGames) =>
					originalGames.filter(
						(game) => game.id !== new_game_comment_Id
					)
				);
			} else {
				console.error("Failed to delete Game Comment");
			}
		});
	};
	const handleUpdate = (new_game_comment_Id) => {
		navigate(`/games/${new_game_comment_Id}`);
	};

	return (
		<main className={theme === "light" ? "light-theme" : "dark-theme"}>
			<Header />
			<Search onChange={handleSearch} games={games} />
			<GameLibraryList
				games={filteredGames}
				handleDelete={handleDelete}
				handleUpdate={handleUpdate}
			/>
			<GameComment
				games={filteredGameComments}
				handleDelete={handleDelete}
				handleUpdate={handleUpdate}
			/>
			<div className="switch">
				<label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
				<ReactSwitch
					onChange={toggleTheme}
					checked={theme === "dark"}
				/>
			</div>
			<Footer />
		</main>
	);
}

export default GameLandPage;
