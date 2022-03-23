import React, { useRef, useState } from 'react';
import styles from '../styles/PostVideo.module.css'
import axios from 'axios'

const PostVideo = () => {
    
    const form = useRef(null)
    
    const upload = async () =>{
        // axios.post("/api/post-video", {
        //     file: form.current.value
        // })
        let oneTimeUrl = ''

        const formData = new FormData()
        formData.append('file', form.current.value)

        await axios.get("/api/get-token").then((res) => {
            oneTimeUrl = res.data.result.uploadURL
        })
        const uploadVideo = await fetch("/api/post-video", {
            method: "POST",
            body: formData,
            oneTimeCloudFlareUrl: oneTimeUrl
        })
    }

    return (
        <div className={styles.PostVideo}>
            <input ref={form} type="file" accept='video/*' />
            <button onClick={upload}>Upload your file</button>
        </div>
    );
};

export default PostVideo;