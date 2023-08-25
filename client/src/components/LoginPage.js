import React, { useState } from 'react';
import Login from './Login'; 
import Signup from './Signup'; 

function LoginPage() {
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
};


export default LoginPage;