import React from 'react';
import styles from '../styles/LoginForm.module.css'

const LoginForm = () => {
    return (
        <div className={styles.LoginForm}>
            <h3>Login</h3>
            <form className={styles.form}>
                <div className={styles.details}>
                    <div className={styles.inputBox}>
                        <label htmlFor='email'>Email</label>
                        <input type="text" placeholder='Enter your email' required id='email'/>
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor="password">Password</label>
                        <input type="text" placeholder='Enter your password' required id='password'/>
                    </div>
                    
                </div>
                <div className={styles.button}>
                    <input type="submit" value='Sign In' />
                </div>
            </form>
        </div>
    );
};

export default LoginForm;