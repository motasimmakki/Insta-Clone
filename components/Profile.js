import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import profile from '../assets/avatar.png'
import { AuthContext } from '../context/auth';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // console.log("User Data: ", user);
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            // console.log("doc: ", doc.data());
            setUserData(doc.data());
        });
        return () => unsub();
    }, [user]);

    return (
        <div>
            <Navbar userData={ userData }/>
            <div className='profile-intro'>
                <div className='profile-avatar'>
                    {/* <Image src={profile}/> */}
                    <Image src={userData.profilePhoto} width={200} height={200}/>
                </div>
                <div>
                    <h1>{userData.fullname}</h1>
                    <h2>Posts: {userData.posts?.length}</h2>
                </div>
            </div>
            <div className='profile-posts-cont'>
                <div className='profile-posts'>
                    <video src=''></video>
                    <video src=''></video>
                    <video src=''></video>
                    <video src=''></video>
                    <video src=''></video>
                    <video src=''></video>
                    <video src=''></video>
                </div>
            </div>
        </div>
  )
}
