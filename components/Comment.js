import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import {v4 as uuidv4} from 'uuid';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Comment({ userData, postData }) {
    const [comment, setComment] = useState('');

    const handleComment = async () => {
        let uid = uuidv4();
        const obj = {
            text: comment,
            userDP: userData.profilePhoto,
            userName: userData.fullname,
            commentId: uid,
            postId: postData.postId
        }
        await setDoc(doc(db, "comments", uid), obj);
        await updateDoc(doc(db, "posts", postData.postId), {
            comments: arrayUnion(uid)
        });
        setComment('');
    }

    return (
        <div className='post-like2'>
            <TextField id="outlined-basic" label="Add comment" variant="outlined" 
            value={comment} onChange={(e) => setComment(e.target.value)} sx={{width: '70%'}}/>
            <Button variant='contained' onClick={handleComment}>Post</Button>
        </div>
    )
}
