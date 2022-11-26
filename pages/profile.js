import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import Profile from '../components/Profile'
import { AuthContext } from '../context/auth'

export default function profile() {
  const { user } = useContext(AuthContext);
  const Redirect = () => {
    const router = useRouter();
    router.push('/login');
  }
  return (
    // This component is only be visible when the user is logged in.
    <>
      {
        user?.uid? <Profile/>: <Redirect/>
      }
    </>
  )
}
