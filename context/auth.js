import React, { createContext, useState, useEffect } from 'react'
import {signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import { auth } from '../firebase';
export const AuthContext = createContext();

export default function AuthWrapper({children}) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is signed in.
        setUser(user);
        const uid = user.uid;
      } else {
        // if user is signed out.

      }
    });
    setLoading(false);
  }, [])
  // console.log("Inside AuthWrapper!");
  function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  const store = {
    login,
    logout,
    user
  }
  return (
    <AuthContext.Provider value={store}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
