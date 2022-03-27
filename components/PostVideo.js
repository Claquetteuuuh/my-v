import React, { useRef, useState } from 'react';
import styles from '../styles/PostVideo.module.css'
import axios from 'axios'
import * as tus from 'tus-js-client'
import { useTus } from 'use-tus';

const PostVideo = () => {
    
    const form = useRef(null)
    
    const uploadFunc = async () =>{
        
        let file = form.current.files[0]

        if(!file){
            return;
        }

        let upload = new tus.Upload(file, {

            endpoint: "/api/get-url",

            retryDelays: [0, 3000, 5000, 10000, 20000],

            uploadSize: file.size,

            metadata: {
                fileName: file.name
            },
            // Callback for errors which cannot be fixed using retries
            onError: function(error) {
                console.log("Failed because: " + error)
            },
            // Callback for reporting upload progress
            onProgress: function(bytesUploaded, bytesTotal) {
                var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                console.log(bytesUploaded, bytesTotal, percentage + "%")
            },
            // Callback for once the upload is completed
            onSuccess: function() {
                console.log("Download %s from %s", upload.file.name, upload.url)
            }
        })


        upload.findPreviousUploads().then(function (previousUploads) {
            // Found previous uploads so we select the first one. 
            if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0])
            }
    

            if(!upload){
                return;
            }

            upload.start()
        })
    }

    return (
        <div className={styles.PostVideo}>
            <img src="/img/logos/logo-gradient.svg" alt="logo myv" />
            <div className={styles.postContainer}>
                <input ref={form} id="file" type="file" accept='video/*' />
                <label for="file">
                    select your file
                </label>
                <button onClick={uploadFunc}>Upload your file</button>
            </div>
        </div>
    );
};

export default PostVideo;