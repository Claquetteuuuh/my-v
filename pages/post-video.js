import React from 'react';
import Head from 'next/head'
import PostVideo from '../components/PostVideo';

const postVideo = () => {
    return (

        <div>
            <Head>
                <title>MyV | File upload</title>
                <meta name="description" content="postez des videos gratuitement" />
                <link rel="icon" href="/img/logos/logo-black.png" />
                <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'></link>
            </Head>
            <PostVideo />
        </div>
    );
};

export default postVideo;