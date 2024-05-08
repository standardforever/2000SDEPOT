import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import ReactSwitch from "react-switch";

function NewGameComment() {
	const [title, setTitle] = useState("");

	const [body, setBody] = useState("");

	const [categories, setCategories] = useState([]);
	const [games, setGames] = useState("");
	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		fetch("/categories")
			.then((resp) => resp.json())
			.then((data) => setAllCategories(data));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const gameData = {
			title,
			body: body,
			categories,
		};

		const addGameComment = (NewGameComment) => {
			fetch("/games/comments", {
				method: "POST",
				headers: { "Content-Type": "Application/json" },
				body: JSON.stringify(NewGameComment),
			})
				.then((resp) => resp.json())
				.then((data) => {
					setGames([...games, data]);
				});
		};
		addGameComment(gameData);
		setTitle("");
		setBody("");
		setCategories([]);
	};

	const handleCategoryChange = (event) => {
		setCategories((prevCategories) => {
			const selectedCategory = event.target.value;
			if (prevCategories.includes(selectedCategory)) {
				return prevCategories.filter(
					(category) => category !== selectedCategory
				);
			} else {
				return [...prevCategories, selectedCategory];
			}
		});
	};

	return (
		<div>
			<Header />
			<section className="new-game-comment-form">
				<h1>Add A Comment!</h1>
				<br />
				<br />
				<form onSubmit={handleSubmit}>
					<label htmlFor="title">Title: </label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					<label htmlFor="body">Tell Us What's On Your Mind!: </label>
					<input
						type="text"
						id="body"
						value={body}
						onChange={(event) => setBody(event.target.value)}
					/>
					<div className="category-select">
						<label htmlFor="categories">Categories: </label>
						<select
							id="categories"
							multiple
							value={categories}
							onChange={handleCategoryChange}>
							{allCategories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<button type="submit">Submit</button>
				</form>
			</section>
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

export default NewGameComment;
