import React from 'react';
import Navbar from '../components/Navbar'
import RegisterForm from '../components/RegisterForm';
import styles from '../styles/signup.module.css'

const signup = () => {
    return (
        <div className={styles.signup}>
            <Navbar />
            <div className={styles.formContainer}>
                <RegisterForm />
            </div>
            
        </div>
    );
};

export default signup;