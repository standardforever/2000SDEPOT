function GameCommentList({ comments }) {
	return (
		<>
			<h2
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				List of Comments
			</h2>
			<section className="gamelist">
				{Array.isArray(comments) && comments.length > 0 ? (
					comments.map(({ title, body, game_comment_id }, index) => (
						<div key={index}>
							<h3>Title: {title}</h3>
							<p>Body: {body}</p>
							<p>GameId: {game_comment_id}</p>
						</div>
					))
				) : (
					<p>Loading...</p>
				)}
			</section>
		</>
	);
}

export default GameCommentList;
