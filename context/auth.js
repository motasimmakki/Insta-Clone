import React, { createContext } from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
export const AuthContext = createContext();

export default function AuthWrapper({children}) {
  // console.log("Inside AuthWrapper!");
  function login(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
  }
  const store = {
    login
  }
  return (
    <AuthContext.Provider value={store}>
        {children}
    </AuthContext.Provider>
  )
}
