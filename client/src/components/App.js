import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Note the change from `Switch` to `Routes` and `Navigate`
import NavBar from "./NavBar";
import Home from "./Home";
import Songs from "./Songs";
import Artists from "./Artists";
import Playlist from "./Playlist";
// import Login from './Login';
// import Signup from './Signup';
import LoginPage from './LoginPage'
import { UserContext } from "../context/user";

// import "./App.css";

function App() {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    fetch('/authenticate')
      .then(r => {
        if (r.ok) {
          r.json().then(userObject => setUser(userObject))
        }
      })
  }, [setUser])

  return (
    <div>
      {user === null ?

        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/" />} />
            <Route path="/loginpage" element={<LoginPage />}  />
            <Route path="/*" element={<LoginPage />} />
          </Routes>
        </Router>
      :
      <Router>
        <div className='title'>
          <h1>TuneVerse</h1>
        </div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/playlists" element={<Playlist />} />
          {/* You can also set a default route */}
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
      }
    </div>
  )
}


export default App;