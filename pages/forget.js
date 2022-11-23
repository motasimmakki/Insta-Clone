import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../assets/Instagram.jpeg'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import bg4 from '../assets/bg4.jpg';
import bg5 from '../assets/bg5.jpg';
import { AuthContext } from '../context/auth'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Index() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { forgetPassword, user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if(user) {
            router.push('/');
        }
    }, [user])

    let handleClick = async () => {
        try {
            console.log(email);
            setLoading(true);
            setError("");
            await forgetPassword(email);
            console.log("Email sent!");
            router.push('/login');
        } catch(err) {
            console.log("Error ", JSON.stringify(err));
            setError(err.code);
            setTimeout(() => {
                setError('');
            }, 2000)
        }
        setLoading(false);
    }

    return (
        <div className='login-wrapper'>
            <div className='insta-mob-img'>
                <Carousel className='insta-mob-carousel' 
                showStatus={false} showIndicators={false}
                showArrows={false} showThumbs={false}
                autoPlay interval={1500} infiniteLoop st>
                    <div>
                        <Image src={bg1} className='mob-img' alt='mob-img' priority/>
                    </div>
                    <div>
                        <Image src={bg2} className='mob-img' alt='mob-img'/>
                    </div>
                    <div>
                        <Image src={bg3} className='mob-img' alt='mob-img'/>
                    </div>
                    <div>
                        <Image src={bg4} className='mob-img' alt='mob-img'/>
                    </div>
                    <div>
                        <Image src={bg5} className='mob-img' alt='mob-img'/>
                    </div>
                </Carousel>
            </div>
            <div className='login-cont'>
            <div className='login-card'>
                <Image src={logo} alt="instagram-logo"/>
                
                <TextField id="outlined-basic" label="E-mail"
                variant="outlined" fullWidth margin="dense" type='email'
                value={email} onChange={(e) => setEmail(e.target.value)}/>
                {/* If error, then show error. */}
                {
                    (error != "") && <div style={{color: "red"}}>{error}</div>
                }
                <div className='login-btn'>
                    <Button variant="contained" fullWidth margin="dense" 
                    onClick={handleClick}>
                        Send Mail
                    </Button>
                </div>
            </div>
            <div className='bottom-card'>
                Don't have an account? 
                <Link href='/signup'>
                    <span className='signup-btn-in-login'> Signup</span>
                </Link>
            </div>
            </div>
        </div>
    )
}
