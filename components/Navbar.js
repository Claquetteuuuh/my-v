import React from 'react';
import styles from '../styles/Navbar.module.css'
import Link from 'next/link';

const Navbar = (props) => {
    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/"><img src='/img/logos/logo-gradient.png' height="47" width='55' /></Link>
            </div>
            <div className={styles.input}>
                <input type="text" placeholder='rechercher une video...'/>
                <img src="/img/svg/search-outline.svg" alt="search" />
            </div>
            <div className={styles.right}>
                {(props.avatar)? <img src={`${props.avatar}`} height={50} width={50} />: <Link href="/login"><img className={styles.loginButton} src="/img/svg/login.svg" height={33} width={33} /></Link>}
                <Link href="/post-video"><img className={styles.addButton} src="/img/svg/add-button.svg" height={33} width={33} /></Link>
            </div>
        </div>
    );
};

export default Navbar;