import React, {useEffect, useState} from 'react';
import styles from '../styles/findcontent.module.css'
import axios from 'axios'
import Video from "./Video"

const FindContent = ({content}) => {

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    const [find, setFind] = useState(false)

    useEffect(async () => {
        await axios.get('/api/get-stream')
        .then((res) => {
            setdata(res.data)
        })

        setloading(false)

    }, [])

    return (
        <div className={styles.findcontent}>
            {
                data.map((video) => (
                    (video.meta.name.toLowerCase().includes(content.toLowerCase())? <Video 
                    key={video.uid}
                    miniature={video.thumbnail}
                    title={video.meta.name}
                    channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                    channelName="Lorem susu"
                    views="10M"
                    date="12/12/1212"
                    id={video.uid}
                />: setFind(true))
                        
                    
                ))
            }
        </div>
    );
};

export default FindContent;