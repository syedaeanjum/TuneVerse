import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import Login from './Login'; 
import Signup from './Signup'; 
// import ./LoginPage.css;

export default function TogglePage() {
    const [showLogin, setShowLogin] = useState(true); 

    const toggleView = () => {
        setShowLogin(prevShowLogin => !prevShowLogin);
    };

    return (
        <div>
            <button onClick={toggleView}>
                {showLogin ? 'Sign Up' : 'Log In'}
            </button>

            {showLogin ? <Login /> : <Signup />}
        </div>
    );
}
