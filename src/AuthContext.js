import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      setUser(JSON.parse(userLocalStorage));
    }
    const storedRoute = localStorage.getItem('storedRoute');
    if (storedRoute) {
      navigate(storedRoute);
      localStorage.removeItem('storedRoute');
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
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
      });
  };
  const logout = async () => {
    try {
      localStorage.setItem('storedRoute', window.location.pathname);
      await fetch('/logout', {
        method: 'DELETE',
      });
      swal({
        title: 'Success',
        text: 'Logout Successful!',
        icon: 'success',
        timer: 1000,
        buttons: false,
      });
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
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
        localStorage.setItem("user", JSON.stringify({...user, ...data}));
        setUser((prevUser) => ({
          ...prevUser,
          ...data,
        }));
        return data;
      })
      .catch((error) => {
        console.error('Update failed:', error);
      });
  };
  useEffect(() => {
    const beforeUnloadHandler = (event) => {
      localStorage.setItem('storedRoute', window.location.pathname);
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}