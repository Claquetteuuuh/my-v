import React from 'react';
import Container404 from '../components/Container404';
import Navbar from '../components/Navbar'
import Head from 'next/head'

const page404 = () => {
    return (
        <div>
            <Head>
            <title>MyV | Page no found</title>
            <meta name="description" content="Cette page est un chemin de non retour" />
            <link rel="icon" href="/img/logos/logo-black.png" />
            </Head>
            <Navbar />
            <Container404 />
        </div>
    );
};

export default page404;