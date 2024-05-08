function GameLibraryList({ games }) {
	return (
		<>
			<h2>Game List</h2>
			{Array.isArray(games) && games.length > 0 ? (
				games.map(
					(
						{ title, description, created_at, release_date },
						index
					) => (
						<div key={index}>
							<h3>Title: {title}</h3>
							<p>Description: {description}</p>
							<p>Date of Creation: {created_at}</p>
							<p>Released Date: {release_date}</p>
						</div>
					)
				)
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

export default GameLibraryList;
