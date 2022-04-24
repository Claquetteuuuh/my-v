import Head from 'next/head'
import Navbar from '../components/Navbar'
import VideoContainer from '../components/VideoContainer'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MyV | Home</title>
        <meta name="description" content="MyV ! Le premier site de streaming de video made in guadeloupe. Regardez des videos en ligne avec votre streamer de video Guadeloupéen !" />
        <link rel="icon" href="/img/logos/logo-black.png" />
        <link rel='canonical' href='https://www.my-v.xyz/' />
        <html lang={'fr'} />
      </Head>

      <Navbar/>
      <VideoContainer />
    </div>
  )
}
