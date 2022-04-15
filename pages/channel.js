import React from 'react';
import styles from '../styles/channel.module.css'
import Navbar from '../components/Navbar'
import ChannelComponent from '../components/ChannelComponent';
import Head from 'next/head'
import {useRouter} from 'next/router'

const channel = () => {

    const router = useRouter()
    const queryKey = 'name';
    const name = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))


    return (
        <div className={styles.channel}>

            <Head >
                <title>{`MyV - ${name}`}</title>
                <meta name='description' content={`info on ${name}`}/>
                <link rel="icon" href="/img/logos/logo-black.png" />
            </Head>

            <Navbar />
            <ChannelComponent />
            
        </div>
    );
};

export default channel;