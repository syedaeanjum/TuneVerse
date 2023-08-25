import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from "./NavBar"; 
import Home from "./Home"; 
import Songs from "./Songs"; 
import Artists from "./Artists"; 
import Playlist from "./Playlist"; 
import Login from './Login';
import Signup from './Signup'

// import "./App.css";


function App() {
  return(
    <Router>
      <Route path="/login" element={<Login setShowLogin={true} />} /> 
      <Route path="/signup" element={<Signup setShowLogin={false} />} /> 
      <Route path="/*" element={<AuthenticatedRoutes />} /> 
    </Router>
  )

}

function AuthenticatedRoutes() {
  return ( 
    <>
      <Router>
        <div className= 'title'> 
          <h1>TuneVerse</h1>  </div>
            <NavBar />
            <Switch>
              <Route path="/home" element={<Home/>} />
              <Route path="/songs" element={<Songs/>} />
              <Route path="/artists" element={<Artists/>} />
              <Route path="/playlists" element={<Playlist />}  />
            </Switch>
      </Router>
    </>
  );
}


export default App;
