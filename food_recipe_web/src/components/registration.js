import React, { useState } from 'react';
import './registration.css'; // Import the CSS file
import { Link,Navigate } from 'react-router-dom';


function Registration() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password.length < 8) {
      setErrorMessage('*Password must be at least 8 characters long');
      return;
    }

    console.log('Registered:', email, password);
    setLoggedIn(true);
  };
  if(loggedIn) {
   
    return <Navigate to="/home" />;
  }

  return (
    <div className="form-container" >
      <h2>Registration</h2>
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
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Registration;
