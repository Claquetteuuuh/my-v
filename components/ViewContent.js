import React, { useEffect, useState } from 'react';
import Player from '../components/Player';
import styles from '../styles/ViewContent.module.css'
import Video from '../components/Video'
import axios from 'axios'
import { useRouter } from 'next/router';
import Head from 'next/head';

const ViewContent = () => {

    const router = useRouter()
    const queryKey = 'id';
    const id = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
        
    const [data, setdata] = useState([]);

    const dateParser = (date) => {

        let newDate = new Date(date).toLocaleDateString('fr-FR', {
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

        await axios.post('/api/add-view-or-like', {
            videoId: id,
            type: 'view'
        }).then(res => {
            console.log(res.data.message)
        }).catch(err =>{
            console.log(err)
        })


    }, [])

    return (
        <div className={styles.content}>
            <Head>
                <title>MyV | Watch video </title>
                <meta name="description" content={`watch ${id}`} />
                <link rel="icon" href="/img/logos/logo-black.png" />
                {/* <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'></link> */}
            </Head>

                <div className={styles.videoInfo}>
                    <Player />
                </div>
                <div className={styles.nextProposition}>
                {
                    data.map((video) => (
                
                        (id != video.videoId)?
                        <div key={video.videoId} className={styles.uniqueVideo}>
                            <Video 
                                miniature={video.miniature}
                                title={video.title}
                                channelPicture={(video.channelPic)? video.channelPic : '/img/svg/random-user.jpg'}
                                channelName={video.channel}
                                views={video.views.length}
                                date={(video.date)? dateParser(video.date): '00/00/00'}
                                id={video.videoId}
                            
                            />
                        </div>
                        : false
                    )).reverse()
                }
                </div>
            
            </div>
    );
};

export default ViewContent;