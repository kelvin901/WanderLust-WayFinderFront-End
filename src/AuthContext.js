import React, { useState, createContext, useContext, useEffect } from 'react';
import swal from 'sweetalert';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by reading the 'user' data from localStorage
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      setUser(JSON.parse(userLocalStorage));
    }
  }, []);

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
        setUser(data.user); // Update the user state with the received data
        localStorage.setItem('user', JSON.stringify(data.user)); // Store the 'user' data in localStorage
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
    return fetch('/logout', {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        swal({
          title: 'Success',
          text: 'Logout Successful!',
          icon: 'success',
          timer: 1000,
          buttons: false,
        }).then(() => {
          setUser(null); // Clear user state on logout
          localStorage.removeItem('user'); // Remove the 'user' data from localStorage
        });
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