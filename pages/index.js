import { Button, Form, Input, message } from 'antd'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import styles from '../styles/Home.module.css'
import Tick from '../assets/tick.svg';
import { useState } from 'react'
import { getCookie } from 'cookies-next'

export default function Home() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (val) => {
    try {
      setLoading(true);
      const email = getCookie('222__email')
      const address = val.address;
      const res = await fetch('/api/submit',
        {
          body: JSON.stringify({ email, address }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      )
      const result = await res.json();
      console.log(result);

      if(!res.ok) message.error(result.data.message)
      if(res.ok) message.success('Successfully submit')
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div >
      <Header auth />
      <Head>
        <title>Selendra Special Airdrop</title>
        <meta name="description" content="Celebrate Selendra Mainnet Launch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <center className={styles.container}>
        <div className={styles.card}>
          <p className={styles.title}>Almost there!</p>
          <Form 
            layout='vertical'
            className={styles.ant_form}
            requiredMark={false}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Selendra address"
              name="address"
              rules={[{ required: true, message: 'Please input your Selendra address!' }]}
            >
              <Input placeholder="5xx" className="input" />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' loading={loading} className={styles.button}>Claim</Button>
            </Form.Item>
          </Form>
          <p>You will:</p>
          <p className={styles.info}><Image className={styles.icon} src={Tick} alt='' width='16' height='16' />Receive 222 SEL native token when its mainnet launch on February 2nd, 2022.</p>
          <p className={styles.info}><Image className={styles.icon} src={Tick} alt='' width='16' height='16' />Receive email on upcoming events such as this airdrop.</p>
        </div>
      </center>
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true
    }
  };
}