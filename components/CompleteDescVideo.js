import React, {useEffect, useState, useRef} from 'react';
import styles from '../styles/CompleteDescVideo.module.css'
import axios from 'axios'

const CompleteDescVideo = ({videoID}) => {

    const [title, setTitle] = useState('');
    const [miniature, setMiniature] = useState('');
    const [description, setDescription] = useState('');

    const gamingCheck = useRef(null)
    const memeCheck = useRef(null)
    const musicCheck = useRef(null)
    const animalCheck = useRef(null)
    const otherCheck = useRef(null)

    const createKeywordList = () =>{
        let liste = []
        if(gamingCheck.checked){
            liste.push('gaming')
        }
        if(memeCheck.checked){
            liste.push('meme')
        }
        if(musicCheck.checked){
            liste.push('music')
        }
        if(animalCheck.checked){
            liste.push('animal')
        }
        if(otherCheck.checked){
            liste.push('other')
        }
        return liste
    }

    const sendVideoInMongoDb = (e) => {
        e.preventDefault()
        axios.post('/api/push-video',{
            id: videoID,
            title: title,
            miniature: miniature,
            description: description,
            keywords: createKeywordList()
        }).then(e => {
            window.location.href = `/view?id=${e.data.video.cloudflareId}`
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
                <div>
                    <label htmlFor='gaming'>Gaming</label><input ref={el => {gamingCheck = el}} id='gaming' type="checkbox"/>
                    <label htmlFor='meme'>meme</label><input ref={el => {memeCheck = el}} id='meme' type="checkbox"/>
                    <label htmlFor='music'>music</label><input ref={el => {musicCheck = el}} id='music' type="checkbox"/>
                    <label htmlFor='animal'>animal</label><input ref={el => {animalCheck = el}} id='animal' type="checkbox"/>
                    <label htmlFor='other'>other</label><input ref={el => {otherCheck = el}} id='other' type="checkbox"/>
                </div>
            </form>
        </div>
    );
};

export default CompleteDescVideo;