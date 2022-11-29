import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { db, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export default function Upload({ userData }) {
  // console.log("User data: ", userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const fileLimit = 50;

  const handleChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if(file === null) {
      setError("File Not Selected!");
      setTimeout(() => {setError('')}, 2000);
      return;
    }
    if((file.size / (1024 * 1024)) > fileLimit) {
      setError(`File too large, try uploading a file less than ${fileLimit}MB`);
      setTimeout(() => setError(''), 3000);
      return;
    }
    setLoading(true);

    let uid = uuidv4();
    const storageRef = ref(storage, `${userData.uid}/post/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
        console.log('Upload is ' + prog + '% done');
      }, 
      (error) => {
        console.log("Error: ", error);
        setError(error.code);
        setTimeout(() => {
          setError("");
        }, 2000)
        return;
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at: ', downloadURL);
          let postData = {
            likes: [],
            postId: uid,
            postURL: downloadURL,
            profileName: userData.fullname,
            profilePhotoURL: userData.profilePhoto,
            userId: userData.uid,
            timeStamp: serverTimestamp()
          };
          console.log("postData: ", postData);
          await setDoc(doc(db, "posts", uid), postData);
          console.log("Post added to post collection successfully!!!");
        });
        console.log("User Signed In!");
      })
      // setLoading(false);
    }

  return (
    <div className='upload-btn'>
      {
        (error != "")? 
        <Alert severity="error">{error}</Alert> : 
        <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="outlined" color="secondary" component="label" size="large">
                <MovieIcon/>
                Upload Media
                <input hidden accept="*" multiple type="file" onChange={handleChange}/>
            </Button>
        </Stack>
      }
      {
        loading &&
        <LinearProgress variant="determinate" color="secondary" value={progress}
        sx={{mt:"0.5rem", mb:"0.5rem"}}/>
      }
    </div>
  )
}
