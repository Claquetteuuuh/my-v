import React, { useEffect, useState } from 'react';
import styles from '../styles/VideoContainer.module.css'
import Video from './Video';
import axios from 'axios'

const VideoContainer = () => {
    
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(async () => {
        await axios.get('/api/get-stream')
        .then((res) => {
            setdata(res.data)
        })

        setloading(false)

    }, [])

    return (
        <div className={styles.VideoContainer}>
            {(loading == true)? <img className={styles.loading} src="/img/gif/loading.gif" alt="loading image" width={200} /> : console.log('loading ended')}
            {data.map((video) => (
                
                <Video 
                    key={video.uid}
                    miniature={video.thumbnail}
                    title={video.meta.filename}
                    channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                    channelName="Lorem susu"
                    views="10M"
                    date="12/12/1212"
                    id={video.uid}
                />
                
            ))}
        </div>
    );
};

export default VideoContainer;