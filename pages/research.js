import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import FindContent from '../components/FindContent';
import { useRouter } from 'next/router';
import styles from '../styles/research.module.css'

const Research = () => {

    const router = useRouter()
    const queryKey = 'search';
    const search = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))


    return (
        <div>
            <Head >
                <title>{`MyV - Result for ${search}`}</title>
                <meta name='description' content={`MyV ! Le premier site de streaming de video made in guadeloupe. Resultat de recherche pour ${search}`}/>
                <link rel="icon" href="/img/logos/logo-black.png" />
                <link rel='canonical' href='https://www.my-v.xyz/' />
                <html lang={'en'} />
            </Head>
            <img className={styles.solid} src="/img/svg/Solide.svg" alt="background deco" />
            <Navbar />
            {/* test */}
            <FindContent/>
        </div>
    );
};

export default Research;