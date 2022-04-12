import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import styles from '../styles/view.module.css'
import Video from '../components/Video'
import axios from 'axios'

const view = () => {
    
    const [data, setdata] = useState([]);

    const dateParser = (date) => {

        let newDate = new Date(date).toLocaleDateString('gp-GP', {
            year: "numeric",
            month: 'numeric',
            day: 'numeric',
        })
        return newDate
    }

    useEffect(async () => {
        await axios.get('/api/mongo-stream')
        .then((res) => {
            setdata(res.data)
        })


    }, [])

    return (
        <div>
            <Head>
                <title>MyV | Watch video</title>
                <meta name="description" content="regardez des videos gratuitement" />
                <link rel="icon" href="/img/logos/logo-black.png" />
                {/* <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'></link> */}
            </Head>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.videoInfo}>
                    <Player />
                </div>
                <div className={styles.nextProposition}>
                {
                    data.map((video) => (
                
                        <div className={styles.uniqueVideo}>
                            <Video 
                                key={video.videoId}
                                miniature={video.miniature}
                                title={video.title}
                                channelPicture={(video.channelPic)? video.channelPic : '/img/svg/random-user.jpg'}
                                channelName={video.channel}
                                views={video.views}
                                date={(video.date)? dateParser(video.date): '00/00/00'}
                                id={video.videoId}
                            
                            />
                        </div>
                    
                    )).reverse()
                }
                </div>
            
            </div>
            
        </div>
    );
};

export default view;