import React from 'react';
import Head from 'next/head'
import PostVideo from '../components/PostVideo';
import Navbar from '../components/Navbar'
import { TusClientProvider } from 'use-tus';

const postVideo = () => {
    return (

        <div>
            <Head>
                <title>MyV | File upload</title>
                <meta name="description" content="MyV ! Le premier site de streaming de video made in guadeloupe. Postez des videos gratuitement ici !" />
                <link rel="icon" href="/img/logos/logo-black.png" />
            </Head>
            <Navbar />
            <TusClientProvider>
                <PostVideo />
            </TusClientProvider>
            
        </div>
    );
};

export default postVideo;