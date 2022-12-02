import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';

export default function Comment() {
    const [comment, setComment] = useState('');

    const handleComment = () => {

    }

    return (
        <div className='post-like2'>
            <TextField id="outlined-basic" label="Add comment" variant="outlined" 
            value={comment} onChange={(e) => setComment(e.target.value)} sx={{width: '70%'}}/>
            <Button variant='contained' onClick={handleComment}>Post</Button>
        </div>
    )
}
