import Head from 'next/head'
import Navbar from '../components/Navbar'
import VideoContainer from '../components/VideoContainer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MyV | Home</title>
        <meta name="description" content="regarder des videos en ligne" />
        <link rel="icon" href="/img/logos/logo-black.png" />
        <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'></link>
      </Head>

      <Navbar avatar="" />
      <VideoContainer />
    </div>
  )
}
