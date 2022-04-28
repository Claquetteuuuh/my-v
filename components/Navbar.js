import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css'
import Link from 'next/link';
import axios from 'axios'

const Navbar = (props) => {
    
    const [formValue, setFormValue] = useState('');
    const [userData, setuserData] = useState();

    const deployResearch = () => {

    }

    useEffect(() => {
        axios.get('/api/get-picture').then(e => {
            setuserData(e.data)
        }).catch(e =>{
            console.log(`error ${e}`);
        })
    }, []);
    
    const formSub = (e) => {
        e.preventDefault()
        window.location.href = `/research?search=${formValue}`
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/"><img loading="eager" src='/img/logos/logo-gradient.png' height="47" width='55' alt={'Logo myV'} /></Link>
            </div>
            <form onSubmit={e => formSub(e)} className={styles.input}>
                <input className={styles.text} value={formValue} onChange={e => setFormValue(e.target.value)} type="text" placeholder='rechercher une video...'/>
                <input className={styles.submit} type='image' src={'/img/svg/search-outline.svg'} href={`/research?search=${formValue}`}/>
            </form>
            <div className={styles.right}>
                <button onClick={() => {deployResearch()}} className={styles.buttonSearch}><img height={50} src={'/img/svg/search-outline.svg'} alt="research img" /></button>
                {(userData)? <Link href={`/channel?name=${userData.channel}`}><img loading="eager" height={50} width={50} src={(userData.picture)? userData.picture: '/img/svg/random-user.jpg' } className={styles.avatar} alt={`Picture of ${userData.channel}`} /></Link>: <Link href="/login"><img className={styles.loginButton} src="/img/svg/login.svg" height={40} width={40} /></Link>}
                {(userData)? <Link href="/post-video"><img loading="eager" className={styles.addButton} src="/img/svg/add-button.svg" height={50} width={50} alt='add new video button' /></Link>: false}
            </div>
        </div>
    );
};

export default Navbar;