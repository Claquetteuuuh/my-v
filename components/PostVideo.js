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
            // Endpoint is the upload creation URL from your tus server
            endpoint: "/api/get-url",
            // Retry delays will enable tus-js-client to automatically retry on errors
            retryDelays: [0, 3000, 5000, 10000, 20000],
            // Attach additional meta data about the file for the server

            uploadSize: file.size,

            headers:{
                'Tus-Resumable': '1.0.0'
            },

            metadata: {
                filename: file.name,
                filetype: file.type,
            },
            // Callback for errors which cannot be fixed using retries
            onError: function(error) {
                console.log("Failed because: " + error)
                console.log()
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
            console.log(upload);
        })
    }

    return (
        <div className={styles.PostVideo}>
            <input ref={form} type="file" accept='video/*' />
            <button onClick={uploadFunc}>Upload your file</button>
        </div>
    );
};

export default PostVideo;