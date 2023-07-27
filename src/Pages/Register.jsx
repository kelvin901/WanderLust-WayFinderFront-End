// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../AuthContext';

// import { Link } from 'react-router-dom';
// export default function Register() {
//   const { register } = useContext(AuthContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [password_confirmation, setPasswordConfirmation] = useState('');
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(email + '  ' + password);
//     register(email, password, password_confirmation);
//   };
//   return (
//     <div className="d-flex justify-content-center">
//       <form onSubmit={handleSubmit} className="w-45 bg-white p-5 shadow-sm">
//         <h1 className="font-semibold text-2xl my-6">SignUp</h1>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label font-weight-bold">
//             Your Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="form-control"
//             placeholder="Email"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label font-weight-bold">
//             Your Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="form-control"
//             placeholder="Password"
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password_confirmation" className="form-label font-weight-bold">
//             Password Confirmation
//           </label>
//           <input
//             type="password"
//             id="password_confirmation"
//             value={password_confirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//             className="form-control"
//             placeholder="Password"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary btn-lg btn-block text-white"
//           style={{ backgroundColor: 'green' }}
//         >
//           Sign up
//         </button>
//         <div className="my-5">
//           Already Registered?{' '}
//           <Link className="ml-4" to="/login">
//             Login
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logo_2 } from "../assets/home";
import './register.css';
import swal from 'sweetalert';


function SignUpForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fadeState, setFadeState] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track if passwords match



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
  
    fetch('https://events-app-api-mu7z.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
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
            text: 'Failed to  sign up',
            icon: 'error',
            buttons: false,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  
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

      <h1 style={{marginTop:"5px",marginBottom:"20px"}}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
      <Link to="/">
        <p style={{ fontSize: '17px', marginTop: '20px' }}>Already registered? Login.</p>
      </Link>
    </div>
    </div>
  );
}

export default SignUpForm;


