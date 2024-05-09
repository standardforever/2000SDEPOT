import logo from './logo.svg';
import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./Components/ThemeContext";
import GameLibrary from "./pages/GameLibrary";
import GameComments from "./pages/GameComments";
import ErrorPage from "./pages/ErrorPage";
import AddNewGame from "./pages/AddNewGame";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

export function App() {
	const [logInUser, setLogInUser] = useState(null);

	return (
		<div className="app">
			<ThemeProvider>
				<Routes>
					<Route exact path="/" element={<LandingPage />} />
					<Route
						path="/login"
						element={
							!!logInUser ? (
								<Outlet />
							) : (
								<LoginPage setUser={setLogInUser} />
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
