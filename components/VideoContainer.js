import React, { useEffect, useState } from 'react';
import styles from '../styles/VideoContainer.module.css'
import Video from './Video';
import axios from 'axios'

const VideoContainer = () => {
    
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);

    let listSkeletton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // how many skeletton we want

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

        setloading(false)

    }, [])

    return (
        <div className={styles.VideoContainer}>
            {(loading == true)? 
                listSkeletton.map((skeletton) => (
                    <img className={styles.skeletton} src='/img/svg/skeletton.svg' alt={`skeletton ${skeletton}`} />
                ))
            : console.log('loading ended')}
            {data.map((video) => (
                
                <Video 
                    key={video.videoId}
                    miniature={video.miniature}
                    title={video.title}
                    channelPicture={(video.channelPic)? video.channelPic : '/img/svg/random-user.jpg'}
                    channelName={video.channel}
                    views={video.views.length}
                    date={(video.date)? dateParser(video.date): '00/00/00'}
                    id={video.videoId}
                
                />
                
            )).reverse()}
        </div>
    );
};

export default VideoContainer;