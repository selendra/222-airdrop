import '../styles/globals.css'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Header from '../components/header';
import Loading from '../components/loading';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if(!getCookie('222__email')) router.push('/login');
  }, [router.pathname]);

  if(pageProps.protected && !getCookie('222__email')) {
    return (
      <div>
        <Header />
        <Loading />
      </div>
    )
  }

  return <Component {...pageProps} />
}

export default MyApp
