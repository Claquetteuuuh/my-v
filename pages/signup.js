import React from 'react';
import Navbar from '../components/Navbar'
import RegisterForm from '../components/RegisterForm';
import styles from '../styles/signup.module.css'
import Head from 'next/head'


const signup = () => {
    
    return (
        <div className={styles.signup}>

            <Head >
                <title>{`MyV - Create an account`}</title>
                <meta name='description' content="create your new account in myV"/>
                <link rel="icon" href="/img/logos/logo-black.png" />
            </Head>
            

            <Navbar />
            <div className={styles.formContainer}>
                <RegisterForm />
            </div>
            
        </div>
    );
};

export default signup;