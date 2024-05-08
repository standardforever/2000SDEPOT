import { NavLink } from "react-router-dom";
import React from 'react';
import Logout from './Logout';


function Header() {


    return (
        <header>
            <h1 className="header-title">My Games</h1>
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Logout />
            </div>
            <br/>
            <nav className="nav-links">
                <NavLink to="/games">Game Library</NavLink>
                <NavLink to="/games/:new_game_comment_Id">New Games</NavLink>
                <NavLink to="/games/comments">Game Comments</NavLink>
                <NavLink to="/games/favorites">Top Games </NavLink>
                <br/>
                <br/>
                
            </nav>
        </header>
    )
}

export default Header;