import React from 'react';
import styles from '../styles/Player.module.css'
import { Stream } from "@cloudflare/stream-react";
import { useRouter } from 'next/router';

const Player = () => {

    const router = useRouter()
    const {id} = router.query

    return (
        <div className={styles.player}>
            <Stream controls src={id} className={styles.iframe} />
        </div>
    );
};

export default Player;