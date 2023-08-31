import React, { useState } from 'react';

const SignupPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

   
    const formObj = {
      username: userData.username,
      password: userData.password
    };

    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObj)
    })
    .then(r => {
      if (r.ok) {
        r.json()
        .then(data => {
          
          console.log(data);
        });
      } else {
        r.json()
        .then(data => {
          
          console.log(data);
        });
      }
    })
    .catch(error => {
      
      console.error(error);
    });

    
    setUserData({
      username: '',
      password: ''
    });
  };

  return (
    <div className='signup-form'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
