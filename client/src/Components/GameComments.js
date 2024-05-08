import React, { useState, useEffect } from "react";
import GameCommentForm from "./GameCommentForm";
import GameCommentList from "./GameCommentList";

function GameComments({ gameId }) {
	const [gameComments, setGameComments] = useState([]);

	useEffect(() => {
		fetchComments();
	}, []);

	// Function to fetch comments from the backend
	const fetchComments = async () => {
		try {
			const response = await fetch("http://localhost:3500/comments");
			if (response.ok) throw new Error("failed to fetch comments");
			const data = await response.json();
			setGameComments(data);
		} catch (error) {
			console.error("Error fetching comment", error);
		}
	};

	// Function to add new comment
	const addComment = async (comment) => {
		try {
			const response = await fetch("http://localhost:3500/comments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(comment),
			});
			if (response.ok) throw new Error("failed to add comments");
			const data = await response.json();
			setGameComments([...gameComments, data]);
		} catch (error) {
			console.error("Error adding comment: ", error);
		}
	};

	// Function to add a reply to a comment
	const addReply = async (parentId, reply) => {
		try {
			const response = await fetch("http://localhost:3500/comments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reply),
			});
			if (response.ok) throw new Error("failed to add reply");
			const data = await response.json();
			// Update the comments state to include the new reply
			const updateComments = gameComments.map((comment) => {
				if (comment.id === parentId) {
					return {
						...comment,
						replies: [...comment.replies, data],
					};
				}
				return comment;
			});
			setGameComments(updateComments);
		} catch (error) {
			console.error("Error adding reply: ", error);
		}
	};

	return (
		<div className="comment-section">
			<h2>Comments</h2>
			<GameCommentForm gameId={gameId} addComment={addComment} />
			<GameCommentList comments={gameComments} addReply={addReply} />
		</div>
	);
}
export default GameComments;
