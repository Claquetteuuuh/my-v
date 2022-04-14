import React, {useEffect, useState} from 'react';
import styles from '../styles/NotConnectedUser.module.css'
import axios from 'axios'

const NotConnectedUser = ({username, picture}) => {
    console.log(picture);
    const [totalVideos, settotalVideos] = useState();

    useEffect(() => {
        axios.post('/api/get-video-of', {
            username: username 
        }).then(e => {
            console.log(e);
            settotalVideos(e.data.videos.length)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div className={styles.notConnectedUser}>
            <div className={styles.left}><div className={styles.imgContainer}><img src={picture} /></div></div>
            <div className={styles.userInfo}>
                <h3>Username: {username}</h3>
                <h4>Total video: {totalVideos}</h4>

            </div>
            

        </div>
    );
};

export default NotConnectedUser;