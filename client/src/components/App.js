import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar"; 
import Home from "./Home"; 
import Songs from "./Songs"; 
import Artists from "./Artists"; 
// import Login from "./Login"; 
// import Signup from "./Signup"; 
import Playlist from "./Playlist"; 
import LoginPage from './LoginPage';

// import "./App.css";


function App() {
  return (
    <Router>
      <div className="App">
        <h1>TuneVerse</h1>
        <div>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/songs" component={Songs} />
            <Route path="/artists" component={Artists} />
            <Route path="/playlists" component={Playlist} />
            {/* <Route path="/login" component={Login} /> 
            <Route path="/signup" component={Signup} />  */}
            <Route path = "/loginpage" component = {LoginPage} />
          </Switch>
          {/* <LoginPage /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
