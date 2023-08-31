import React, { useState, useContext } from 'react';
import {useNavigate, useHistory} from 'react-router-dom';
import {UserContext} from '../context/user'
import "../css/LoginPage.css";

    const LoginPage = () => {

    const {setUser} = useContext (UserContext)
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    console.log (loggedIn)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch ('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });
        
            if (response.status === 200) {
                const data = await response.json();
                setLoggedIn(true);
                setUser(data)
                navigate(`/home`);
            } else {
                setErrorMessage('Invalid username or password.');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    return (
        <div className='login-form'>
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        value= {name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className="input-field"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleLogin}>
                Login
                </button>
                
            </form>
        </div>
    );
};

export default LoginPage;
