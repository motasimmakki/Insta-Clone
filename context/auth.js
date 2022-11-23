import React, { createContext } from 'react'
import {signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from 'firebase/auth';
export const AuthContext = createContext();

export default function AuthWrapper({children}) {
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
  return (
    <AuthContext.Provider value={Auth}>
        {children}
    </AuthContext.Provider>
  )
}
