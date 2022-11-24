import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import logo from '../../assets/Instagram.jpeg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import Link from 'next/link';
import { AuthContext } from '../../context/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup, user } = useContext(AuthContext);

    const handleClick = async () => {
        console.log(email);
        console.log(fullname);
        console.log(password);
        console.log(file);
        try {
            setLoading(true);
            setError("");
            const userInfo = await signup(email, password);
            
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, `${userInfo.user.uid}/Profile`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    let userData = {
                        fullname,
                        email,
                        password,
                        profilePhoto: downloadURL
                    };
                    await setDoc(doc(db, "user", userInfo.user.uid), userData);
                });
                console.log("User Signed In!");
            })
        } catch(err) {
            console.log("Error: ", err);
            setError(err.code);
            setTimeout(() => {
                setError("");
            }, 2000)
        }
        setLoading(false);
    }
    
    return (
    <div className='signup-cont'>
        <div className='signup-card'>
            <Image src={logo} alt="instagram-logo"/>
            <div className='signup-msg'>
                Sign up to see photos and videos from your friends
            </div>
            <TextField id="outlined-basic" label="E-mail"
             variant="outlined" fullWidth margin="dense" type='email'
             value={email} onChange={(e) => setEmail(e.target.value)}/>
            
            <TextField id="outlined-basic" label="Password" 
            variant="outlined" fullWidth margin="dense" type='password'
            value={password} onChange={(e) => setPassword(e.target.value)}/>
            
            <TextField id="outlined-basic" label="Full Name" 
            variant="outlined" fullWidth margin="dense"
            value={fullname} onChange={(e) => setFullname(e.target.value)}/>

            <div className='upload-btn'>
                <Button variant="outlined" fullWidth margin="dense" 
                color="secondary" component="label">
                    <CloudUploadTwoToneIcon className='upload-icon'/>
                    Upload Profile Image
                    <input hidden accept='image/*' type="file"
                    onChange={(e) => setFile(e.target.files[0])}/>
                </Button>
            </div>
            <div className='signup-btn'>
                <Button variant="contained" fullWidth margin="dense"
                onClick={handleClick}>
                    Signup
                </Button>
            </div>
            { (error !== "") && <div style={{color: "red"}}>{error}</div> }
            <div className='tnc'>
                By signing up, you agree to our Terms, Conditions and Cookies policy.
            </div>
        </div>
        <div className='bottom-card'>
            Already have an account? 
            <Link href='/login'>
                <span className='login-btn-in-signup'> Login</span>
            </Link>
        </div>
    </div>
    )
}
