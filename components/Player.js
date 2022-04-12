import React from 'react';
import styles from '../styles/Player.module.css'
import { useRouter } from 'next/router';

const Player = () => {

    const router = useRouter()
    const {id} = router.query

    return (
        <div className={styles.player}>
                <iframe style={styles.iframe} allow='autoplay; fullscreen; picture-in-picture' src={`https://iframe.videodelivery.net/${id}?preload=metadata&autoplay=true`}/>
            {/* <Stream controls autoplay src={id} className={styles.iframe} /> */}
        </div>
    );
};

export default Player;