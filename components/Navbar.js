import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css'
import Link from 'next/link';
import axios from 'axios'

const Navbar = (props) => {
    
    const [formValue, setFormValue] = useState('');
    const [userData, setuserData] = useState();

    useEffect(() => {
        axios.get('/api/get-picture').then(e => {
            console.log(e);
            setuserData(e.data)
        }).catch(e =>{
            console.log(`error ${e}`);
        })
    }, []);
    
    const formSub = (e) => {
        e.preventDefault()
        console.log('ok');
        window.location.href = `/research?search=${formValue}`
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/"><img src='/img/logos/logo-gradient.png' height="47" width='55' /></Link>
            </div>
            <form onSubmit={e => formSub(e)} className={styles.input}>
                <input className={styles.text} value={formValue} onChange={e => setFormValue(e.target.value)} type="text" placeholder='rechercher une video...'/>
                <input className={styles.submit} type='image' src={'/img/svg/search-outline.svg'} href={`/research?search=${formValue}`}/>
            </form>
            <div className={styles.right}>
                {(userData)? <Link href={`/channel?name=${userData.channel}`}><img src={(userData.picture)? userData.picture: '/img/svg/random-user.jpg' } className={styles.avatar} height={50} width={50} /></Link>: <Link href="/login"><img className={styles.loginButton} src="/img/svg/login.svg" height={33} width={33} /></Link>}
                <Link href="/post-video"><img className={styles.addButton} src="/img/svg/add-button.svg" height={33} width={33} /></Link>
            </div>
        </div>
    );
};

export default Navbar;