import React from 'react'
import { Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Post({ postData }) {
  return (
    <div className='post-cont'>
        <video src={postData.postURL}/>
        <div className='videos-info'>
            <div className='avatar-cont'>
                <Avatar alt='Remy Sharp' src={postData.profilePhotoURL}/>
                <p>{postData.profileName}</p>
            </div>
            <div className='post-like'>
                <FavoriteIcon/>
                <p>3</p>
                {/* <p>{postData.likes.length}</p> */}
            </div>
        </div>
    </div>
  )
}
