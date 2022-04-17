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
        })
    }

    return (
        <div className={styles.completeVideoContainer}>
            <iframe src={`https://iframe.videodelivery.net/${videoID}?preload=metadata&autoplay=true`} />
            <form onSubmit={e => sendVideoInMongoDb(e)}>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
                <input type="text" value={miniature} onChange={e => setMiniature(e.target.value)} />
            </form>
        </div>
    );
};

export default CompleteDescVideo;