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
                <Categories keyword={"Meme"} data={data}/>
                <Categories keyword={"Gaming"} data={data}/>
                <Categories keyword={"Music"} data={data}/>
                <Categories keyword={"Animal"} data={data}/>
                <Categories keyword={"Other"} data={data}/>
            </div>
            
            }
        </div>
    );
};

export default VideoContainer;