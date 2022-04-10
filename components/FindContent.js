import React, {useEffect, useState} from 'react';
import styles from '../styles/findcontent.module.css'
import axios from 'axios'
import Video from "./Video"
import { useRouter } from 'next/router';

const FindContent = () => {

    const router = useRouter()
    const {search} = router.query

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    const [find, setFind] = useState(false)

    useEffect(async () => {
        await axios.get('/api/mongo-stream')
        .then((res) => {
            setdata(res.data)
        })

        setloading(false)

    }, [])

    return (
        <div className={styles.findcontent}>
            {
                data.map((video) => (
                (video.title.toLowerCase().includes(search.toLowerCase())? 
                    <Video 
                        key={video.videoId}
                        miniature={video.miniature}
                        title={video.title}
                        channelPicture={video.channelPic}
                        channelName={video.channel}
                        views={video.views}
                        date="12/12/1212"
                        id={video.videoId}
                    
                    />
                : false)
                        
                    
                ))
            }
        </div>
    );
};

export default FindContent;