import React from 'react';
import styles from '../styles/Player.module.css'
import { Stream } from "@cloudflare/stream-react";
import { useRouter } from 'next/router';

const Player = () => {

    const router = useRouter()
    const {id} = router.query

    const logQuery = () =>{
        console.log(query)
    }

    return (
        <div className={styles.player}>
            <button onClick={logQuery}>click me</button>
            <Stream controls src={id} className={styles.iframe} />
        </div>
    );
};

export default Player;