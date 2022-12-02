import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Post({ postData, userData}) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    if(postData.likes.includes(userData.uid)) {
      setLike(true);
    }
  }, []);

  const handleLike = async () => {
    if(like) {
      setLike(false);
      // Handle uid in postData.likes
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayRemove(userData.uid)
      });
    } else {
      setLike(true);
      await updateDoc(doc(db, "posts", postData.postId), {
        likes: arrayUnion(userData.uid)
      });
    }
  }

  return (
    <div className='post-cont' onDoubleClick={handleLike}>
        <video src={postData.postURL}/>
        <div className='videos-info'>
            <div className='avatar-cont'>
                <Avatar alt='Remy Sharp' src={postData.profilePhotoURL}/>
                <p>{postData.profileName}</p>
            </div>
            <div className='post-like'>
              {(!like)? <FavoriteBorderIcon/>: <FavoriteIcon className= 'likes'/>}
              <p>{postData.likes.length}</p>
            </div>
        </div>
    </div>
  )
}
