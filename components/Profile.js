import React from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
import user from '../assets/avatar.png'

export default function Profile() {
  return (
    <div>
        <Navbar/>
        <div className='profile-intro'>
            <div className='profile-avatar'>
                <Image src={user}/>
            </div>
            <div>
                <h1>Motasim</h1>
                <h2>Posts: 12</h2>
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
