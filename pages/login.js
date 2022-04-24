import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import styles from '../styles/login.module.css'
import Head from 'next/head'

const login = () => {
    return (
        <div className={styles.login}>
            <Head>
                <title>MyV | Login</title>
                <meta name="description" content="MyV ! Le premier site de streaming de video made in guadeloupe. Connectez vous sur MyV" />
                <link rel="icon" href="/img/logos/logo-black.png" />
                <link rel='canonical' href='https://www.my-v.xyz/' />
                <html lang={'en'} />
            </Head>
            <Navbar />
            <div className={styles.formContainer}>
                <LoginForm />
            </div>
        </div>
    );
};

export default login;