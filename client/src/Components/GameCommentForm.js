import React, { useState } from "react";

// Comment Form Component
function GameCommentForm({ gameId, addComment }) {
	const [commentText, setCommentText] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://127.0.0.1:5000/api/comments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					gameId: gameId,
					text: commentText,
					replies: [],
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to add comment");
			}
			const data = await response.json();
			// Call the addComment function passed from CommentSection to update the comments state
			addComment(data);
			// Clear the comment input
			setCommentText("");
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
				placeholder="Write your comment..."></textarea>
			<button type="submit">Comment</button>
		</form>
	);
}

export default GameCommentForm;
