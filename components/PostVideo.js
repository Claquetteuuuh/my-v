import React, { useRef, useState } from 'react';
import styles from '../styles/PostVideo.module.css'
import axios from 'axios'
import * as tus from 'tus-js-client'

const PostVideo = () => {
    
    const form = useRef(null)
    const progressBar = useRef(null)
    const label = useRef(null)
    const [posted, setposted] = useState(false);

    

    const fileUploaded = () =>{
        if(form.current.files[0].name != undefined){
            label.current.innerHTML = form.current.files[0].name
        }
    }


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
                progressBar.current.style.width = `${percentage*3}px`
            },
            // Callback for once the upload is completed
            onSuccess: function() {
                progressBar.current.innerHTML = "File uploaded"
                progressBar.current.innerText = "File uploaded"
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

            setposted(true)
            upload.start()
        })
    }

    return (
        <div className={styles.PostVideo}>
            <img src="/img/logos/logo-gradient.svg" alt="logo myv" />
            <div className={styles.postContainer}>
                <input onChange={fileUploaded} ref={form} id="file" type="file" accept='video/*' />
                <label ref={label} htmlFor="file">
                    select your file
                </label>
                {
                (posted == true)?
                    <div className={styles.progressBar}>
                        <div ref={progressBar} className={styles.inprogress}>wait for uplaoding...</div>
                    </div>  
                :
                    <button onClick={uploadFunc}><img src="/img/svg/upload-sign-svgrepo-com.svg" alt="upload logo" /></button>
                }
                
            </div>
        </div>
    );
};

export default PostVideo;