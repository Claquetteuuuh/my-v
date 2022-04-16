import React, { useState } from 'react';
import styles from '../styles/LoginForm.module.css'
import axios from 'axios'
import Link from 'next/link'

const LoginForm = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const submitForm = async (e) =>{
        e.preventDefault()
        axios.post('/api/login', {
            email: email,
            password: password
        }).then(e => {
            window.location.href = '/'
        }).catch(e => {
            console.log('Incorrect email or password')
        })
    }

    return (
        <div className={styles.LoginForm}>
            <h3>Login</h3>
            <form className={styles.form} onSubmit={e => submitForm(e)}>
                <div className={styles.details}>
                    <div className={styles.inputBox}>
                        <label htmlFor='email'>Email</label>
                        <input value={email} onChange={e => setemail(e.target.value )} type="text" placeholder='Enter your email' required id='email'/>
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={e => setpassword(e.target.value)} type="password" placeholder='Enter your password' required id='password'/>
                    </div>
                    
                </div>
                <div className={styles.button}>
                    <input type="submit" value='Sign In' />
                    <Link href={'/signup'}><p>want to create an account?</p></Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;