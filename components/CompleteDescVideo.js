import React, {useEffect, useState} from 'react';
import styles from '../styles/CompleteDescVideo.module.css'
import axios from 'axios'

const CompleteDescVideo = ({videoID}) => {

    const [title, setTitle] = useState('');
    const [miniature, setMiniature] = useState('');
    const [description, setDescription] = useState('');

    const sendVideoInMongoDb = (e) => {
        e.preventDefault()
        axios.post('/api/push-video',{
            id: videoID,
            title: title,
            miniature: miniature,
            description: description,
            keywords: []
        }).then(e => {
            console.log(e.data)
            // window.location.href = `/view?id=${e.data.video.videoId}`
        })
    }

    return (
        <div className={styles.completeVideoContainer}>
            <iframe src={`https://iframe.videodelivery.net/${videoID}?preload=metadata&autoplay=true`} />
            <form onSubmit={e => sendVideoInMongoDb(e)}>
                <input type="text" placeholder='Le titre de votre video' value={title} onChange={e => setTitle(e.target.value)} />
                <textarea type="text" placeholder='La description de votre video' value={description} onChange={e => setDescription(e.target.value)} />
                <input type="text" placeholder='http://image.png' value={miniature} onChange={e => setMiniature(e.target.value)} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default CompleteDescVideo;