import React from 'react';
import ViewContent from '../components/ViewContent';
import Navbar from '../components/Navbar'
import styles from '../styles/View.module.css'

const view = () => {

    return (
        <div>
            <img className={styles.solid} src="/img/svg/Solide.svg" alt="background deco" />
            <Navbar />
            
            <ViewContent />
        </div>
    );
};

export default view;