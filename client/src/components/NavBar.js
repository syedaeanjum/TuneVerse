import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

const NavBar = () => {
  const linkStyles = {
    textDecoration: "none",
    color: "white",
    width: "300px",
    padding: "12px",
    margin: "0 18px 6px",
    background: "black",
  };

  return (
    <nav style={{ background: "lightgray" }}>
      <NavLink to="/" exact style={linkStyles}>
        Home
      </NavLink>
      <NavLink to="/songs" style={linkStyles}>
        Songs
      </NavLink>
      <NavLink to="/artists" style={linkStyles}>
        Artists
      </NavLink>
      <NavLink to="/playlists" style={linkStyles}>
        Playlists
      </NavLink>
      <NavLink to="/account" style={linkStyles}>
        Account {/* This link will take you to the login page */}
      </NavLink>
    </nav>
  );
};

export default NavBar;
