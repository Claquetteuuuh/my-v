import React from 'react';
import styles from '../styles/channel.module.css'
import Navbar from '../components/Navbar'
import ChannelComponent from '../components/ChannelComponent';


const channel = () => { 

    return (
        <div className={styles.channel}>

            

            <Navbar />
            <ChannelComponent />
            
        </div>
    );
};

export default channel;