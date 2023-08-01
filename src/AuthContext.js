import React, { useState, createContext, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    return fetch('/login', {
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
          return response.json();
        } else {
          throw new Error('Invalid login');
        }
      })
      .then((data) => {
        setUser(data); // Update the user state with the received data
        return data;
      });
  };

  const register = (userData) => {
    return fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to sign up');
        }
      })
      .then((data) => {
        setUser(data); // Update the user state with the received data
        return data;
      });
  };

  const logout = () => {
    fetch("/logout",{
      method: "DELETE",
    })
    .then(res=>res.json())
    .then(() => {
        swal({
          title: 'Success',
          text: 'Logout Successful!',
          icon: 'success',
          timer: 1000,
          buttons: false,
        }).then(() => {
        //   navigate('/login');
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        swal({
          title: 'Error',
          text: 'Failed',
          icon: 'error',
          buttons: false,
        });
     
      setUser(null); // Clear user state on logout

    });
  };


  // UPDATE USER PROFILE INFO

  const updateUser = (userData) => {
    return fetch(`/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update user information');
        }
      })
      .then((data) => {
        setUser(data); // Update the user state with the received data
        return data;
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}