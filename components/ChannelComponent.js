import React,  { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import ConnectedUser from '../components/ConnectedUser';
import styles from '../styles/ChannelComponent.module.css'
import ConnectedVideo from './ConnectedVideo';
import NotConnectedUser from './NotConnectedUser';
import NotConnectedVideo from './NotConnectedVideo';

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
            {
                (isUser)?
                    // is it is the user
                    <div className={styles.connectedContainer}>
                        <ConnectedUser userid={channel.userId} username={channel.username} picture={(channel.picture)? channel.picture: '/img/svg/random-user.jpg'} userEmail={channel.email} />
                        <div className={styles.trait}></div>
                        <ConnectedVideo userid={channel.userId} username={channel.username} userEmail={channel.email} />
                    </div>
                :
                    // if not the user
                    <div className={styles.notConnectedContainer}>
                        <NotConnectedUser username={name} picture={(channel.picture)? channel.picture: '/img/svg/random-user.jpg'} />
                        <div className={styles.trait}></div>
                        <NotConnectedVideo username={name} />
                    </div>
            }
        </div>
    );
};

export default ChannelComponent;