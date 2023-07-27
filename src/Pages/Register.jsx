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



