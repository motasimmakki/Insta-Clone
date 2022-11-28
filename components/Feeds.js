import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'
import { db } from '../firebase';
import Navbar from './Navbar'
import Upload from './Upload'

export default function Feeds() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    console.log("User Data: ", user);
    const unsub = onSnapshot(doc(db, "user", user.uid), (doc) => {
      console.log("doc: ", doc);
      setUserData(doc.data());
    });
    return () => unsub()
  }, [user]);

  return (
    <div className='feed-cont'>
        <Navbar/>
        <Upload/>
        <div className='videos-cont'>
          <div className='post-cont'>
            <video/>
          </div>
          <div className='post-cont'>
            <video/>
          </div>
          <div className='post-cont'>
            <video/>
          </div>
        </div>
    </div>
  )
}
