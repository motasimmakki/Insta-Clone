import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import logo from '../../assets/Instagram.jpeg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import Link from 'next/link';
import { AuthContext } from '../../context/auth';

export default function index() {
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
            console.log("User Signed In!");
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
