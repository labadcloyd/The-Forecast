import { Html, Head, Main} from 'next/document'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} >
    </Component>
  )
}

export default MyApp
