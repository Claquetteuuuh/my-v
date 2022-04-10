import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import styles from '../styles/login.module.css'

const login = () => {
    return (
        <div className={styles.login}>
            <Navbar />
            <div className={styles.formContainer}>
                <LoginForm />
            </div>
        </div>
    );
};

export default login;