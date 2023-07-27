// import { useContext, useState } from 'react';
// import { AuthContext } from '../AuthContext';
// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('I love this');
//     login(email, password);
//   };
//   return (
//     <div className='d-flex align-items-center justify-content-center min-vh-70'>
//       <div className='bg-gray-900 rounded-lg p-5 shadow'>
//         <h1 className='my-3'>Login</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type='text'
//             onChange={(e) => setEmail(e.target.value)}
//             className='form-control rounded mt-2 px-3 py-1'
//             placeholder='Enter Email'
//           />
//           <br />
//           <input
//             type='password'
//             onChange={(e) => setPassword(e.target.value)}
//             className='form-control rounded mt-2 px-3 py-1'
//             placeholder='Enter Password'
//           />
//           <br />
//           <div className='d-flex justify-content-center'>
//             <button
//               disabled={!email || !password}
//               className='btn btn-success rounded-full mt-2 px-3 py-1 font-weight-bold fs-5 text-white'
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default Login;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'

import swal from 'sweetalert';


function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };



  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('https://events-app-api-mu7z.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          swal({
            title: 'Success',
            text: 'Login Successful!',
            icon: 'success',
            timer: 1000,
            buttons: false,
          }).then(() => {
            
              if (typeof onLogin === 'function') {
                onLogin();
              }
              navigate('/home');
            });
        } else {
          swal({
            title: 'Error',
            text: 'Invalid login',
            icon: 'error',
            buttons: false,
          });
          setError('An error occurred. Please try again.'); // Set error message
  
          //Revert button to original state
          const button = document.querySelector('button');
          button.textContent = 'Log in';
          button.disabled = false;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        swal({
          title: 'Error',
          text: 'Invalid login',
          icon: 'error',
          buttons: false,
        });
        setError('An error occurred. Please try again.'); // Set error message
      });
  
      // Change button text to "Logging in"
      const button = document.querySelector('button');
      button.textContent = 'Logging in';
      button.disabled = true;
    };
  return (
    <div className='cover'>
      <div className={`cover-login fade-in`}>
       
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type='password'
            placeholder=' Password'
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <p className='error-message'>{error}</p>}
          <button type='submit'>Log in</button>
        </form>
        <p style={{ marginTop: '50px' }}>
          Not registered?{' '}
          <Link to='/signup'>
            <em style={{ fontSize: '17px', textDecoration: 'none' }}>
              Sign up today!
            </em>
          </Link>{' '}
        </p>
      </div>
     
    </div>
  );
}

export default Login;