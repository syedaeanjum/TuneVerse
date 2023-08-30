import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user"
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


  const { setUser } = useContext(UserContext)
  const handleSignOut = (e) => {
    fetch("/logout", {
      method: "DELETE",
  })
  setUser(null)
  }

  return (
    <div>
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
      <button onClick={handleSignOut}> Sign Out
    </button>
    
    </nav>
    
    </div>
    
  );
};

export default NavBar;
