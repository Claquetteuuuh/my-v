import React, { useEffect, useState } from 'react';
import Player from '../components/Player';
import styles from '../styles/ViewContent.module.css'
import Video from '../components/Video'
import axios from 'axios'
import { useRouter } from 'next/router';

const ViewContent = () => {

    const router = useRouter()
    const {id} = router.query
        
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
        <div className={styles.content}>
                <div className={styles.videoInfo}>
                    <Player />
                </div>
                <div className={styles.nextProposition}>
                {
                    data.map((video) => (
                
                        (id != video.videoIdid)?
                        <div key={video.videoId} className={styles.uniqueVideo}>
                            <Video 
                                miniature={video.miniature}
                                title={video.title}
                                channelPicture={(video.channelPic)? video.channelPic : '/img/svg/random-user.jpg'}
                                channelName={video.channel}
                                views={video.views}
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