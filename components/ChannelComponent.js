import React,  { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import ConnectedUser from '../components/ConnectedUser';
import styles from '../styles/ChannelComponent.module.css'
import ConnectedVideo from './ConnectedVideo';
import NotConnectedUser from './NotConnectedUser';
import NotConnectedVideo from './NotConnectedVideo';
import Head from 'next/head'

const ChannelComponent = () => {

    const [isUser, setisUser] = useState(false);
    const [channel, setchannel] = useState({});

    const router = useRouter()
    const queryKey = 'name';
    const name = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

    useEffect( async () => {
        await axios.post('/api/isuser', {
            channel: name
        }).then(e => {
            if(e.data.isUser){
                setchannel(e.data)
                setisUser(true)
            }else{
                setchannel(e.data)
            }
        })
    }, []);
    return (
        <div className={styles.ChannelComponent}>

            <Head >
                <title>{`MyV - ${name}`}</title>
                <meta name='description' content={`Myv's info on user ${name}`}/>
                <link rel="icon" href="/img/logos/logo-black.png" />
                <link rel='canonical' href='https://www.my-v.xyz/' />
                <html lang={'en'} />
            </Head>

            {
                (isUser)?
                    // is it is the user
                    <div className={styles.connectedContainer}>
                        <ConnectedUser userid={channel.userId} username={channel.username} picture={(channel.picture)? channel.picture: '/img/svg/random-user.jpg'} userEmail={channel.email} />
                        <div className={styles.traitConnected}></div>
                        <ConnectedVideo userid={channel.userId} username={channel.username} userEmail={channel.email} />
                    </div>
                :
                    // if not the user
                    <div className={styles.notConnectedContainer}>
                        <NotConnectedUser username={name} picture={(channel.picture)? channel.picture: '/img/svg/random-user.jpg'} />
                        <div className={styles.traitNonConnected}></div>
                        <NotConnectedVideo username={name} />
                    </div>
            }
        </div>
    );
};

export default ChannelComponent;