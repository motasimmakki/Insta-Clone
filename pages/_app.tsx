import '../styles/globals.css'
import './signup/signup.css'
import './login/login.css'
import '../components/Feed.css'
import '../components/Navbar.css'
import type { AppProps } from 'next/app'
import AuthWrapper from '../context/auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  )
}
