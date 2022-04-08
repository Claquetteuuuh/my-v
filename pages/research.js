import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import FindContent from '../components/FindContent';
import { useRouter } from 'next/router';

const Research = () => {

    const router = useRouter()
    const {search} = router.query

    return (
        <div>
            <Head >
                <title>{`MyV - Result for ${search}`}</title>
                <meta name='description' content={`result for ${search}`}/>
            </Head>

            <Navbar />

            <FindContent content={search} />
            
        </div>
    );
};

export default Research;