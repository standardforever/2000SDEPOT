import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style/addnewgame.css";

function AddNewGame() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [release_date, setRelease_date] = useState("");
	const [games, setGames] = useState([]);
	const token =
		"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkZWZhdWx0X3VzZXIifQ.hWBCFTI8zh4jcMuuxoR9bUfl_PgUYh258AnH9-EhYXs";

	const addGame = async (game) => {
		try {
			const response = await fetch("http://127.0.0.1:5000/api/games", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify(game),
			});
			const data = await response.json();
			setGames([...games, data]);
		} catch (error) {
			console.error("Error adding game", error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addGame({ title, description, release_date });
		setTitle("");
		setDescription("");
		setRelease_date("");
	};

	return (
		<div className="container">
			<h2>Fill the information to post a new game</h2>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					placeholder="Released data"
					type="text"
					value={release_date}
					onChange={(e) => setRelease_date(e.target.value)}
				/>
				<textarea
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Description about the game"
					rows={"5"}
					cols={"33"}
				/>
				<button type="submit">Add</button>
			</form>
			<button>
				<Link to={"/games"}>Back to Game Library</Link>
			</button>
		</div>
	);
}

export default AddNewGame;
