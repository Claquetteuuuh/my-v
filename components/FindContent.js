import React, {useEffect, useState} from 'react';
import styles from '../styles/findcontent.module.css'
import axios from 'axios'
import Video from "./Video"
import { useRouter } from 'next/router';

const FindContent = () => {

    const router = useRouter()
    const queryKey = 'search'
    const search = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    const [find, setFind] = useState(false)

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
        <div className={styles.findcontent}>
            {
                data.map((video) => (
                (video.title.toLowerCase().includes(search.toLowerCase())? 
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
                : false)
                        
                    
                ))
            }
        </div>
    );
};

export default FindContent;