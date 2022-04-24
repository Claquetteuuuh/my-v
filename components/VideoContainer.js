import React, { useEffect, useState } from 'react';
import styles from '../styles/VideoContainer.module.css'
import axios from 'axios'
import Categories from './Categories';

const VideoContainer = () => {
    
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);

    let listSkeletton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // how many skeletton we want

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
                    <img key={skeletton} className={styles.skeletton} src='/img/svg/skeletton.svg' alt={`skeletton ${skeletton}`} />
                ))
            : 
            
            <div>
                <h1>Here is the video that we have</h1>
                <Categories keyword={"Meme"} loading={"eager"} data={data}/>
                <Categories keyword={"Gaming"} loading={"lazy"} data={data}/>
                <Categories keyword={"Music"} loading={"lazy"} data={data}/>
                <Categories keyword={"Animal"} loading={"lazy"} data={data}/>
                <Categories keyword={"Other"} loading={"lazy"} data={data}/>
                <Categories keyword={"Any"} loading={"lazy"} data={data}/>
            </div>
            
            }
        </div>
    );
};

export default VideoContainer;