import React, { createContext, useState, useEffect } from 'react'
import {signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
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
        setUser("");
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
  function forgetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function signup(email, password) {
    return signInWithEmailAndPassword (auth, email, password);
  }
  const store = {
    login,
    logout,
    user,
    forgetPassword,
    signup
  }
  return (
    <AuthContext.Provider value={store}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
