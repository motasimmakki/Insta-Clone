import React, { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom'
import { Avatar, TextField } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { db } from '../firebase';
import Comment from './Comment';
import DisplayComments from './DisplayComments';
import Image from 'next/image';

export default function Post({ postData, userData}) {
  const [like, setLike] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMute, setIsMute] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleMute = () => {
    if(isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  }

  const handleNextVideo = (event) => {
    let nextVideo = ReactDOM.findDOMNode(event.target).parentNode.nextSibling;
    if(nextVideo) {
      nextVideo.scrollIntoView({behaviour: "smooth"});
    }
  }

  return (
    <div className='post-cont'>
      {
        (postData.postType === 'video')?
          <video autoPlay muted 
          src={postData.postURL} onDoubleClick={handleLike}
          onClick={handleMute} onEnded={handleNextVideo}
          className="actual-post"/>
        : <Image width="200" height="400" src={postData.postURL} 
          alt='user-post' className="actual-post"/>
      }
      <div className='videos-info'>
          <div className='avatar-cont'>
              <Avatar alt='Remy Sharp' src={postData.profilePhotoURL}/>
              <p>{postData.profileName}</p>
          </div>
          <div className='post-like'>
            <AddCommentIcon onClick={handleClickOpen}/>
            {(!like)? 
              <FavoriteBorderIcon onClick={handleLike}/>: 
              <FavoriteIcon onClick={handleLike} className= 'likes'/>}
            <p>{postData.likes.length}</p>
          </div>
      </div>
      <Dialog open={open} onClose={handleClose} 
      aria-labelledby="alert-dialog-title" 
      aria-describedby="alert-dialog-description" 
      fullWidth={true} maxWidth="md">
        <div className='modal-cont'>
          <div className='video-modal'>
            {
              (postData.postType === 'video')?
                <video autoPlay loop controls src={postData.postURL}/>
              : <Image width="200" height="400" src={postData.postURL} 
                alt='user-post' className="detailed-post"/>
            }
          </div>
          <div className='comments-modal'>
            <Card className='card1'>
              <DisplayComments postData={postData}/>
            </Card>
            <Card className='card2'>
              <Typography>
                {postData.likes.length === 0? 
                  'Be the first one to like this post':
                  `Liked by ${postData.likes.length} users`}
              </Typography>
              <div className='post-like2'>
                {(!like)? 
                  <FavoriteBorderIcon onClick={handleLike}/>: 
                  <FavoriteIcon onClick={handleLike} className= 'likes'/>}
                  <Comment userData={userData} postData={postData}/>
              </div>
            </Card>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
