import React from 'react';
import styles from '../styles/Player.module.css'
import { Stream } from "@cloudflare/stream-react";
import { useRouter } from 'next/router';

const Player = () => {

    const router = useRouter()
    const {id} = router.query

    return (
        <div className={styles.player}>
            <img className={styles.loading} width={200} src="/img/gif/loading.gif" alt="loading gif" />
            <Stream controls autoplay src={id} className={styles.iframe} />
        </div>
    );
};

export default Player;