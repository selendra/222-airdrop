import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import selendra from '../assets/selendra.png';
import { LogoutOutlined } from '@ant-design/icons';
import { setCookies } from 'cookies-next';

export default function Header({ auth }) {
  const router = useRouter();
  function handleLogout() {
    setCookies('222__email', '');
    router.push('/login');
  }

  return (
    <div>
      { auth ?
        <div className='header__auth'>
          <Image src={selendra} alt='' height='50' width='120' />
          <Button onClick={handleLogout} className='logout'>Logout<LogoutOutlined /></Button>
        </div> 
        :
        <div className="header">
          <Image src={selendra} alt='' height='50' width='120' />
        </div>
      }
      <div className='magic__line' />
    </div>
  );
}
