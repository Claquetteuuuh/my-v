import React, { useState, useRef } from 'react';
import styles from '../styles/LoginForm.module.css'
import axios from 'axios'
import Link from 'next/link'
import gsap from 'gsap';

const LoginForm = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const inputSub = useRef(null)

    const submitForm = async (e) =>{
        e.preventDefault()
        axios.post('/api/login', {
            email: email.toLowerCase(),
            password: password
        }).then(e => {
            window.location.href = '/'
        }).catch(e => {
            console.log(e)
            gsap.to(inputSub.current, {
                background: 'red',
                value: 'Wrong Email / password',
                duration: 0.3
            })
            gsap.to(inputSub.current, {
                delay: 2,
                background: "linear-gradient(130deg,hsl(43deg 100% 52%) 0%,hsl(34deg 100% 48%) 50%,hsl(23deg 100% 45%) 100%,hsl(0deg 100% 41%) 100%)",
                value: 'Sign in',
            })
            // inputSub.current.style.background = 'red'
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
                    <input ref={inputSub} type="submit" value='Sign in' />
                    <Link href={'/signup'}><p>want to create an account?</p></Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;