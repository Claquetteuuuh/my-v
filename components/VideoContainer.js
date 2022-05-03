import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/VideoContainer.module.css'
import axios from 'axios'
import Categories from './Categories';

const VideoContainer = () => {
    
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);

    const [categories, setCategories] = useState([])

    const memeBox = useRef(null)
    const gamingBox = useRef(null)
    const musicBox = useRef(null)
    const animalBox = useRef(null)
    const otherBox = useRef(null)

    let listSkeletton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // how many skeletton we want

    const refreshCategories = () => {
        let listeCategories = []
        if(memeBox.checked){
            listeCategories.push('Meme')
        }
        if(gamingBox.checked){
            listeCategories.push('Gaming')
        }
        if(musicBox.checked){
            listeCategories.push('Music')
        }
        if(animalBox.checked){
            listeCategories.push('Animal')
        }
        if(otherBox.checked){
            listeCategories.push('Other')
        }
        setCategories(listeCategories)
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
                    <img key={skeletton} className={styles.skeletton} src='/img/svg/skeletton.svg' alt={`skeletton ${skeletton}`} />
                ))
            : 
            
            <div>
                <div className={styles.checkboxs}>
                    <div>
                        <input onChange={() => refreshCategories()} type="checkbox" id='Meme' ref={el => {memeBox = el}} /> <label htmlFor='Meme'>Meme</label>
                    </div>
                    <div>
                        <input onChange={() => refreshCategories()} type="checkbox" id='Gaming' ref={el => {gamingBox = el}} /> <label htmlFor='Gaming'>Gaming</label>
                    </div>
                    <div>
                        <input onChange={() => refreshCategories()} type="checkbox" id='Music' ref={el => {musicBox = el}} /> <label htmlFor='Music'>Music</label>
                    </div>
                    <div>
                        <input onChange={() => refreshCategories()} type="checkbox" id='Animal' ref={el => {animalBox = el}} /> <label htmlFor='Animal'>Animal</label>
                    </div>
                    <div>
                        <input onChange={() => refreshCategories()} type="checkbox" id='Other' ref={el => {otherBox = el}} /> <label htmlFor='Other'>Other</label>
                    </div>
                </div>
                <h1>Here is the video that we have</h1>
                {
                    (categories.length == 0)? <Categories keywords={'any'} loading={"eager"} data={data}/>:<Categories keywords={categories} loading={"eager"} data={data}/>
                }
            </div>
            
            }
        </div>
    );
};

export default VideoContainer;