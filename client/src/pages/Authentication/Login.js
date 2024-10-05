import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import { useAuth } from '../Authentication/AuthContext'; // Import the useAuth hook
import './Login.css'; // Your updated CSS file
import logo from '../../images/MM.jpeg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function submit(e) {
    e.preventDefault();
    setErrorMessage('');

    console.log('Email:', email); // Check email value
    console.log('Password:', password); // Check password value
    
    try {
      const response = await fetch('http://localhost:5000/api/login_details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Log the response

      if (data.code === 200) {
        login(); // Call login function to set the authenticated state
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else if (data.code === 401) {
        alert('Password and email unmatched');
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error("Login error:", error); // Log error for debugging
      setErrorMessage(error.message); // Display error message
    }
  }

  return (
    <div className="bodySec">
      <div className="login-container">
      <p className="text-center mb-2"><img src={logo} alt="Logo" width={'60px'} /></p>
        <h2 className="form-title">Project Manager Portal</h2>
        {/* <SocialLogin />
        <p className="separator"><span>or</span></p> */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={submit} className="login-form">
        <div className="input-wrapper">
          <input 
            type="email" 
            placeholder="Email address" 
            icon="mail" 
            value={email} 
            className="input-field"
            onChange={(e) => setEmail(e.target.value)} 
          />
          </div>
          <div className="input-wrapper">
          <input 
            type="password" 
            placeholder="Password" 
            icon="lock" 
            value={password} 
            className="input-field"
            onChange={(e) => setPassword(e.target.value)} 
          />
          </div>
          <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="signup-prompt">
          Don&apos;t have an account? <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
