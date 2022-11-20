import React from 'react'
import Image from 'next/image'
import logo from '../../assets/Instagram.jpeg'
import instaMobile from '../../assets/insta-mob-bg.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function index() {
  return (
    <div className='login-wrapper'>
        <Image className='insta-mob-img' src={instaMobile} alt='insta-mob'/>
        <div className='login-cont'>
        <div className='login-card'>
            <Image src={logo} alt="instagram-logo"/>
            <TextField id="outlined-basic" label="E-mail"
             variant="outlined" fullWidth margin="dense"/>
            <TextField id="outlined-basic" label="Password" 
            variant="outlined" fullWidth margin="dense"/>
            <div className='forget-password'>
                Forget Password?
            </div>
            <Button variant="contained" fullWidth margin="dense"
            className='login-btn'>
                Log In
            </Button>
        </div>
        <div className='bottom-card'>
            Don't have an account? <span className='signup-btn-in-login'>Signup</span>
        </div>
        </div>
    </div>
  )
}
