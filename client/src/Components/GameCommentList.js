import GameCommentForm from "./GameCommentForm";

function GameCommentList({ comments, addReply }) {
	return (
		<ul className="comment-list">
			{comments.map((comment) => (
				<li key={comment.id}>
					<p>{comment.text}</p>
					<GameCommentForm
						addComment={(reply) => addReply(comment.id, reply)}
					/>
					<ul className="reply-list">
						{comment.replies.map((reply) => (
							<li key={reply.id}>
								<p>{reply.text}</p>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}

export default GameCommentList;
