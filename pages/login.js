/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Header from "../components/header";
import giftbox from '../assets/gift.gif';
import { GoogleLogin } from 'react-google-login';
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const responseSuccess = async (response) => {
    try {
      const { profileObj } = response;
      if(profileObj) { 
        localStorage.setItem('222__email', profileObj.email);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <center>
        <div className="login__card">
          <div>
            <Image src={giftbox} alt='' width='90' height='90'  />
          </div>
          <div>
            <p className="login__title">Celebrate Selendra Mainnet Launch <span>Claim 222 SEL native token.</span></p>
            <p className="login__text">You are invited to join this special moment of Selendra's new chapter🎉</p>
            <GoogleLogin
              clientId="920463513406-pen1v1u7jd0nht7e4iugrrvvn0fep1eb.apps.googleusercontent.com"
              cookiePolicy={'single_host_origin'}
              className='google__btn'
              onSuccess={responseSuccess}
            />
          </div>
        </div>
      </center>
    </div>
  )
}
