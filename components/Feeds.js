import React from 'react'
import Navbar from './Navbar'
import Upload from './Upload'

export default function Feeds() {
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
