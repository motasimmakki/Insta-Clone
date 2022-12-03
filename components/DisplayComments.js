import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Avatar, CircularProgress } from '@mui/material';

export default function DisplayComments({ postData }) {
    const [allComments, setAllComments] = useState(null);

    useEffect(() => {
        getComments();
    }, [postData]);

    const getComments = () => {
        let tempArr = [];
        postData.comments?.map(async (commentsId) => {
            const docSnap = await getDoc(doc(db, "comments", commentsId));
            tempArr.push(docSnap.data());
        });
        setAllComments(tempArr);
    }

    return (
        <div>
            {
            (allComments === null)? (<CircularProgress/>):
            (<>
                {allComments.map((commentObj) => {
                    console.log(commentObj);
                    return (
                        <div key={commentObj.commentId} className='comment'>
                            <Avatar src={commentObj.userDP}/>
                            <p><span>{commentObj.userName}</span>{commentObj.text}</p>
                        </div>
                    );
                })}    
            </>)
            }
        </div>
    )
}
