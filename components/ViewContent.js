import React, { useEffect, useState, useRef } from 'react';
import Player from '../components/Player';
import styles from '../styles/ViewContent.module.css'
import Video from '../components/Video'
import axios from 'axios'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link'
import CommentContainer from './CommentContainer';

const ViewContent = () => {

    const router = useRouter()
    const queryKey = 'id';
    const id = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
        
    const [data, setdata] = useState([]);
    const [thisVideo, setthisVideo] = useState()
    const [thisVideoUser, setthisVideoUser] = useState()

    const [hasLike, setHasLike] = useState(false)

    const likeText = useRef(null)

    const [loading, setloading] = useState(true)

    const dateParserNumeric = (date) => {

        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            year: "numeric",
            month: 'numeric',
            day: 'numeric',
        })
        return newDate
    }

    const dateParser = (date) => {

        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            year: "numeric",
            month: 'long',
            day: 'numeric',
        })
        return newDate
    }


    const clickLike = () => {
        if (hasLike) {
            axios.post('/api/dislike', {
                videoId: id
            }).then(res =>{
                setHasLike(false)
                axios.get('/api/mongo-stream')
                .then((res) => {
                    setdata(res.data)
                    res.data.forEach(video => {
                        if(video.videoId == id || video.videoId == id[1]){
                            setthisVideo(video)
                            axios.post('/api/get-picture', {
                                channel: video.channel
                            }).then(res => {
                                setthisVideoUser(res.data)
                                setloading(false)
                            })
                            
                        }
                    });
                })
            })
        }else{
            axios.post('/api/add-view-or-like', {
                videoId: id,
                type: 'like'
            }).then(res => {
                setHasLike(true)
                axios.get('/api/mongo-stream')
                    .then((res) => {
                        setdata(res.data)
                        res.data.forEach(video => {
                            if(video.videoId == id || video.videoId == id[1]){
                                setthisVideo(video)
                                axios.post('/api/get-picture', {
                                    channel: video.channel
                                }).then(res => {
                                    setthisVideoUser(res.data)
                                    setloading(false)
                                })
                                
                            }
                        });
                    })
                
            })
        }
    }


    useEffect(async () => {

        await axios.get('/api/mongo-stream')
        .then((res) => {
            setdata(res.data)
            res.data.forEach(video => {
                if(video.videoId == id || video.videoId == id[1]){
                    setthisVideo(video)
                    axios.post('/api/get-picture', {
                        channel: video.channel
                    }).then(res => {
                        setthisVideoUser(res.data)
                        setloading(false)
                    })
                    
                }
            });
        })

        await axios.post('/api/add-view-or-like', {
            videoId: id,
            type: 'view'
        }).then(res => {
        }).catch(err =>{
            console.log(err)
        })

        await axios.post('/api/has-like', {
            cdnId: id
        }).then(res => {
            setHasLike(res.data.inLikeList)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <div className={styles.content}>
            <Head>
                <title>MyV | Watch video </title>
                <meta name='description' content={`Regardez ${id} sur MyV ! Le premier site de streaming de video made in guadeloupe`}/>
                <link rel="icon" href="/img/logos/logo-black.png" />
                <link rel='canonical' href='https://www.my-v.xyz/' />
                <html lang={'en'} />
            </Head>

                <div className={styles.videoInfo}>
                    <Player />
                    {(!loading)?
                        <div className={styles.videoDesc}>
                            <div className={styles.left}>
                                <div className={styles.leftContainer}>
                                    <h3>{thisVideo.title}</h3>
                                    <p>{`${thisVideo.views.length} views  •  Posted the ${dateParser(thisVideo.date)}`}</p>
                                    <Link href={`/channel?name=${thisVideoUser.channel}`}>
                                        <div className={styles.profil}>
                                            <img width={50} height={50} src={(thisVideoUser.picture)?thisVideoUser.picture: '/img/svg/random-user.jpg'} alt={`picture of ${thisVideoUser.channel}`} />
                                            <div className={styles.user}>
                                                <p>{thisVideoUser.channel}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.trait}></div>
                            <div className={styles.right}>
                                <div className={styles.likeContainer}>
                                    <button onClick={e => clickLike()}><img width={32} height={32} src={(hasLike)? '/img/svg/heart-filled.svg': '/img/svg/heart-outline.png'} alt="heart button" /></button>
                                    <p ref={likeText}> {thisVideo.likes.length} likes</p>
                                </div>
                                <div className={styles.shareContainer}>
                                    <button><img width={32} height={32} src="/img/svg/share-social-outline.svg" alt="share svg" /> Share</button>
                                </div>
                            </div>
                        </div>
                    :false}
                    <div className={styles.longTrait}></div>
                    {(thisVideo)? <CommentContainer videoID={thisVideo.videoId}/>: false}
                </div>
                <div className={styles.nextProposition}>
                {
                    data.map((video) => (
                
                        (id != video.videoId)?
                        <div key={video.videoId} className={styles.uniqueVideo}>
                            <Video 
                                miniature={video.miniature}
                                title={video.title}
                                channelPicture={(video.channelPic)? video.channelPic : '/img/svg/random-user.jpg'}
                                channelName={video.channel}
                                views={video.views.length}
                                date={(video.date)? dateParserNumeric(video.date): '00/00/00'}
                                id={video.videoId}
                            
                            />
                        </div>
                        : false
                    )).reverse()
                }
                </div>
            
            </div>
    );
};

export default ViewContent;