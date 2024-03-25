import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
   
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }
    console.log('Logged in:', email, password);

    // For demonstration purposes, assuming login was successful
    setLoggedIn(true);
  };

  if(loggedIn) {
    // Redirect to home page if logged in
    return <Navigate to="/home" />;
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='error-txt'>{errorMessage}</p>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/">Register</Link></p>
    </div>
  );
}

export default Login;
