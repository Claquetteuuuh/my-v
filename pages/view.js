import Head from 'next/head';
import React from 'react';
import ViewContent from '../components/ViewContent';
import Navbar from '../components/Navbar'
import {useRouter} from 'next/router'

const view = () => {

    const router = useRouter()
    const queryKey = 'id';
    const id = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))


    return (
        <div>
            <Head>
                <title>MyV | Watch video </title>
                <meta name="description" content={`watch ${id}`} />
                <link rel="icon" href="/img/logos/logo-black.png" />
                {/* <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'></link> */}
            </Head>
            <Navbar />
            
            <ViewContent />
        </div>
    );
};

export default view;