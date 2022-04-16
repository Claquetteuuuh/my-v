import React, { useState, useRef } from 'react';
import styles from '../styles/RegisterForm.module.css'
import Link from 'next/link'
import axios from 'axios'

const RegisterForm = () => {

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [picture, setpicture] = useState('');

    const emailInput = useRef(null)
    const passwordInput = useRef(null)
    const pictureInput = useRef(null)
    
    const submitForm = async (e) => {
        e.preventDefault()
        if(email.includes('@')){
            emailInput.current.style.border = '2px solid #f58b00'
            if(password.length >= 8){
                passwordInput.current.style.border = '2px solid #f58b00'
                if(picture.includes('http') || picture == ''){
                    pictureInput.current.style.border = '2px solid #f58b00'
                    axios.post('/api/signup', {
                        username: username,
                        email: email.toLowerCase(),
                        password: password,
                        picture: picture
                    }).then(e => {
                        window.location.href = '/'
                    }).catch(err => {
                        console.log(err)
                    })
                }else{
                    pictureInput.current.style.border = '2px solid red';
                }
            }else{
                passwordInput.current.style.border = '2px solid red';
            }
        }else{
            emailInput.current.style.border = '2px solid red';
        }
    }

    return (
        <div className={styles.RegisterForm}>
            <h3>Register</h3>
            <form className={styles.form} onSubmit={e => submitForm(e)}>
                <div className={styles.details}>
                    <div className={styles.inputBox}>
                        <label htmlFor='username'>Username</label>
                        <input required id='username' placeholder='Enter your username' type="text" value={username} onChange={(e) => setusername(e.target.value)} />
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor='email'>Email</label>
                        <input ref={emailInput} required id='email' placeholder='Enter your email' type="text" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    
                    <div className={styles.inputBox}>
                        <label htmlFor='password'>Password</label>
                        <input ref={passwordInput} required id='password' placeholder='Enter your password (min 8 letters)' type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>

                    <div className={styles.inputBox}>
                        <label htmlFor='picture'>Picture</label>
                        <input ref={pictureInput} id='picture' placeholder='Enter your picture link' type="text" value={picture} onChange={(e) => setpicture(e.target.value)} />
                    </div>

                </div>

                <div className={styles.button}>
                    <input type="submit" value='Register' />
                    <Link href={'/login'}><p>already registered?</p></Link>
                </div>
            </form>

        </div>
        
    );
};

export default RegisterForm;