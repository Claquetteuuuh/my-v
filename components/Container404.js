import React from 'react';
import styles from '../styles/Container404.module.css'


const Container404 = () => {
    return (
        <div className={styles.global404}>
            <div className={styles.contain404}>
                <span>4</span>
                <img src="/img/logos/logo-black-with-outline.svg" alt="logo black" />
                <span>4</span>
            </div>
            <h1>Cette Page n'existe pas !</h1>
        </div>
    );
};

export default Container404;