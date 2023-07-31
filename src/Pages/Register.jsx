import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logo_2 } from "../assets/home";
import './register.css';
import swal from 'sweetalert';
import { useAuth } from '../AuthContext'; // Import useAuth hook

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { register } = useAuth(); // Access register function from AuthContext

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

    register({
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password,
    })
      .then(() => {
        swal({
          title: 'Success',
          text: 'Sign up successful!',
          icon: 'success',
          buttons: false,
          timer: 2000,
        }).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        swal({
          title: 'Error',
          text: 'Failed to sign up',
          icon: 'error',
          buttons: false,
        });
      });
  };

  return (
    <div className='cover'>
      <div className={`cover-signup fade-in`}>
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

export default Register;
