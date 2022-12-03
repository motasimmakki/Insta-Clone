import React, { useEffect, useState } from 'react'
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

export default function Post({ postData, userData}) {
  const [like, setLike] = useState(false);
  const [open, setOpen] = React.useState(false);

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

  return (
    <div className='post-cont' onDoubleClick={handleLike}>
        <video src={postData.postURL}/>
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
              <video src={postData.postURL}/>
            </div>
            <div className='comments-modal'>
              <Card className='card1'></Card>
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
                    {/* <TextField id="outlined-basic" label="Add comment" variant="outlined" />
                    <Button variant='contained'>Post</Button> */}
                    <Comment userData={userData} postData={postData}/>
                </div>
              </Card>
            </div>
          </div>
        </Dialog>
    </div>
  )
}
