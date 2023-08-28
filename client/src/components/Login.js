import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

// const LoginPage = () => {
//     const [userData, setUserData] = useState({
//         username: '',
//         password: ''
//     });

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // Prepare the data for the fetch request
//         const formObj = {
//             name: userData.name,
//             password: userData.password
//         };

//         fetch ('http://localhost:3000/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formObj)
//         })
//         .then(r => {
//             if (r.ok) {
//                 r.json()
//                 .then(data => {
//                     // Handle successful login, e.g., redirect to home page
//                     console.log(data);
//                 });
//             }
//             else {
//                 r.json()
//                 .then(data => {
//                     // Handle login error, e.g., display error message
//                     console.log(data);
//                 });
//             }
//         })
//         .catch(error => {
//             // Handle fetch error
//             console.error(error);
//         });

//         // Reset the form
//         setUserData({
//             username: '',
//             password: ''
//         });
//     };
    const LoginPage = () => {

    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState('false');
    const [errorMessage, setErrorMessage] = useState('');

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
