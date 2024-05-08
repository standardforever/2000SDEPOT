import logo from './logo.svg';
import React, { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth";
import { ThemeProvider } from "./Components/ThemeContext";
import GameLibrary from "./Components/GameLibrary";
import GameComments from "./Components/GameComments";
import FavGames from "./Components/FavGames";
import NewGameComment from "./Components/NewGameComment";
import ErrorPage from "./Components/ErrorPage";
import AddNewGame from "./Components/AddNewGame";

export function App() {
	const [logInUser, setLogInUser] = useState(null);

	return (
		<div className="app">
			<ThemeProvider>
				<Routes>
					<Route
						exact
						path="/"
						element={
							!!logInUser ? (
								<Outlet />
							) : (
								<Auth setUser={setLogInUser} />
							)
						}
					/>
					<Route path="/games" element={<GameLibrary />} />
					<Route path="/games/post" element={<AddNewGame />} />
					<Route path="/games/comments" element={<GameComments />} />
					{/* <Route path="/games/favorite" element={<FavGames />} />
					<Route path="/games/:new_game_comment_Id" element={<NewGameComment />} /> */}
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;
