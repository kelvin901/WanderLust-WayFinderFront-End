import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logo_2 } from "../assets/home";
import './register.css';
import swal from 'sweetalert';

function SignUpForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fadeState, setFadeState] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return; // Don't submit the form if passwords don't match
    }

    const button = document.querySelector('button');
    button.innerHTML = 'Signing up...';
    button.disabled = true;

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,   
        last_name: lastName,     
        username: username,      
        password: password,      
      }),
    })
      .then((response) => {
        if (response.ok) {
          swal({
            title: 'Success',
            text: 'Sign up successful!',
            icon: 'success',
            buttons: false,
            timer: 2000,
          }).then(() => {
            navigate('/');
          });
        } else {
          console.log('Sign up failed');
          swal({
            title: 'Error',
            text: 'Failed to sign up',
            icon: 'error',
            buttons: false,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // After a successful or failed sign up, revert the button to "Sign Up"
    setTimeout(() => {
      button.innerHTML = 'Sign Up';
      button.disabled = false;
    }, 2000);
  };

  useEffect(() => {
    setFadeState('fade-in');
    return () => {
      setFadeState('fade-out');
    };
  }, []);

  return (
    <div className='cover'>
      <div className={`cover-signup ${fadeState}`}>
        <img src={logo_2} alt="Logo" className='brandimg' />
        <h1 style={{ marginTop: "5px", marginBottom: "20px" }}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="name-inputs">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
            pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
          <button type="submit">Sign Up</button>
        </form>
        <Link to="/login">
          <p style={{ fontSize: '17px', marginTop: '20px' }}>Already registered? Login.</p>
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;