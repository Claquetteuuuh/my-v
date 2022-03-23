import React from 'react';
import styles from '../styles/Player.module.css'
import { Stream } from "@cloudflare/stream-react";

const Player = () => {
    return (
        <div className={styles.player}>
            <Stream controls src={'516a29626a69548de66a6c34d7b9f40e'} className={styles.iframe} />
        </div>
    );
};

export default Player;