import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import styles from '../styles/View.module.css'

const view = () => {
    return (
        <div>
            <Head>
                <title>MyV | Watch video</title>
                <meta name="description" content="regardez des videos gratuitement" />
                <link rel="icon" href="/img/logos/logo-black.png" />
                <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'></link>
            </Head>
            <Navbar />
            <Player />  
        </div>
    );
};

export default view;