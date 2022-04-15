import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import FindContent from '../components/FindContent';
import { useRouter } from 'next/router';

const Research = () => {

    const router = useRouter()
    const queryKey = 'search';
    const search = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))


    return (
        <div>
            <Head >
                <title>{`MyV - Result for ${search}`}</title>
                <meta name='description' content={`result for ${search}`}/>
                <link rel="icon" href="/img/logos/logo-black.png" />
            </Head>

            <Navbar />
            {/* test */}
            <FindContent/>
        </div>
    );
};

export default Research;