import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
// import Header from '../components/header';
// import Loading from '../components/loading';
import '../styles/globals.css'
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    async function validate() {
      const user = await getCookie('222__email')
      if(pageProps.protected && !user) {
        router.push('/login')
      };
    }
    validate();
  }, [router.pathname]);

  return <Component {...pageProps} />
}

export default MyApp
