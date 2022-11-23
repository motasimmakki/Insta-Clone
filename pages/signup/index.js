import React from 'react'
import Image from 'next/image'
import logo from '../../assets/Instagram.jpeg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import Link from 'next/link';

export default function index() {
  return (
    <div className='signup-cont'>
        <div className='signup-card'>
            <Image src={logo} alt="instagram-logo"/>
            <div className='signup-msg'>
                Sign up to see photos and videos from your friends
            </div>
            <TextField id="outlined-basic" label="E-mail"
             variant="outlined" fullWidth margin="dense"/>
            <TextField id="outlined-basic" label="Password" 
            variant="outlined" fullWidth margin="dense"/>
            <TextField id="outlined-basic" label="Full Name" 
            variant="outlined" fullWidth margin="dense"/>
            <div className='upload-btn'>
                <Button variant="outlined" fullWidth margin="dense" 
                color="secondary" component="label">
                    <CloudUploadTwoToneIcon className='upload-icon'/>
                    Upload Profile Image
                    <input hidden accept='image/*' type="file"/>
                </Button>
            </div>
            <div className='signup-btn'>
                <Button variant="contained" fullWidth margin="dense">
                    Signup
                </Button>
            </div>
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
