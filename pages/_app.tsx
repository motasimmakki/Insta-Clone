import '../styles/globals.css'
import './signup/signup.css'
import './login/login.css'
import '../components/Navbar.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
