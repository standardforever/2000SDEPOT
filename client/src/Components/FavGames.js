import React, { useState, useEffect, useContext } from "react";
import GameLibrary from "./GameLibrary";
import Header from "./Header";
import ReactSwitch from "react-switch";

function FavGames() {
	const [favGames, setFavGames] = useState([]);

	useEffect(() => {
		fetchFavGames();
	}, []);

	const fetchFavGames = async () => {
		try {
			const response = await fetch("/games/favorite", {
				method: "GET",
				credentials: "include",
			});
			console.log(response);
			if (!response.ok) {
				throw new Error("Failed to fetch favorite games");
			}
			const data = await response.json();
			setFavGames(data);
		} catch (error) {
			console.error("Error fetching favorite games:", error);
		}
	};

	return (
		<div>
			<Header />
			<h1>Favorite Games</h1>
			<ul>
				{favGames.map((games) => (
					<GameLibrary key={games.id} games={games} />
				))}
			</ul>
			{/* <div className="switch">
				<label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
				<ReactSwitch
					onChange={toggleTheme}
					checked={theme === "dark"}
				/>
			</div> */}
		</div>
	);
}

export default FavGames;
