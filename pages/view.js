import React from 'react';
import ViewContent from '../components/ViewContent';
import Navbar from '../components/Navbar'
import Head from 'next/head'

const view = () => {

    return (
        <div>
            <Head >
                <title>MyV - View a video</title>
                <meta name='description' content={`Regardez des videos sur MyV ! Le premier site de streaming de video made in guadeloupe`}/>
                <link rel="icon" href="/img/logos/logo-black.png" />
            </Head>
            <Navbar />
            
            <ViewContent />
        </div>
    );
};

export default view;