import React, { useRef } from 'react';
import styles from '../styles/PostVideo.module.css'
import axios from 'axios'

const PostVideo = () => {

    const form = useRef(null)

    const upload = () =>{
        // axios.post("/api/post-video", {
        //     file: form.current.value
        // })

        const formData = new FormData()
        formData.append('file', form.current.value)
        const uploadVideo = fetch("/api/post-video", {
            method: "POST",
            body: formData
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