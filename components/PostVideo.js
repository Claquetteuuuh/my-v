import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/PostVideo.module.css'
import axios from 'axios'
import * as tus from 'tus-js-client'
import CompleteDescVideo from './CompleteDescVideo';
import { useRouter } from 'next/router';
import Image from 'next/image';

const PostVideo = () => {

    const form = useRef(null)
    const progressBar = useRef(null)
    const label = useRef(null)
    const [posted, setposted] = useState(false);
    const [existInCloudflare, setexistInCloudflare] = useState(false)
    
    const router = useRouter()
    const queryKey = 'cdnid';
    const videoID = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

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
                window.location.href = `/post-video?cdnid=${upload.url.split( '/' )[4].split('?')[0]}`
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

    useEffect(() => {
        if(videoID){
            axios.get('/api/cloudflare-stream').then(e => {
                e.data.forEach(videoInfo => {
                    if(videoID == videoInfo.uid || videoID[1] == videoInfo.uid){
                        setexistInCloudflare(true)
                    }
                });
            })
        }
    }, []);

    return (
        <div className={styles.PostVideoContainer}>
                        
            {(!videoID)?
                <div className={styles.PostVideo}>
                    <h1>Post a new video on MyV</h1>    
                    <img width={200} height={160} src="/img/logos/logo-gradient.svg" alt="logo myv" />
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
                            <button onClick={uploadFunc}><img width={35} height={32} src="/img/svg/upload-sign-svgrepo-com.svg" alt="upload logo" /></button>
                        }
                            
                            
                    </div>
                </div>
            : (existInCloudflare)? <CompleteDescVideo videoID={videoID} /> : <Image src='/img/gif/loading.gif' width={200} height={70} />
            }

        </div>
    );
};

export default PostVideo;