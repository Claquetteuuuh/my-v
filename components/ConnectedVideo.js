import React, { useState, useEffect } from 'react';
import styles from '../styles/ConnectedVideo.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios'
import Link from 'next/link';

const ConnectedVideo = ({userid}) => {
    
    const [videos, setvideos] = useState([]);

    const deleteThisVideo = (id) => {
        axios.post('/api/delete-video', {
            id: id
        }).then(() => {
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect( async () => {
        await axios.post('/api/get-video-of', {
            userId: userid
        }).then(async (e) => {
            setvideos(e.data.videos)
        })
    }, []);
    
    return (
        <div className={styles.ConnectedVideo}>
            <h3>Videos</h3>
            
                {  
                    (videos.length != 0 )?
                        <div className={styles.swiperContainer}>
                            <Swiper
                             modules={[Navigation, Pagination, A11y]}
                             spaceBetween={50}
                             slidesPerView={1}
                             navigation={{ clickable: true }}
                             pagination={{ clickable: true }}
                             onSwiper={(swiper) => console.log(swiper)}
                             onSlideChange={() => console.log('slide change')}
                            >
                                {videos.map(video => (
                                    <SwiperSlide key={video._id}>
                                        <div className={styles.slide}>
                                            <button onClick={() => deleteThisVideo(video._id)}><img src="/img/svg/trash-outline.svg" alt="trash image" height={40} /></button>
                                            <img src={video.miniature} />
                                        </div>
                                        <div className={styles.infoVideo}>
                                            <Link href={`/view?id=${video.cloudflareId}`}><h4>{video.title}</h4></Link>
                                            <div>
                                                <p><img src="/img/svg/heart-outline.svg" width={25} alt="heart" /> {video.likes.length} Likes</p>
                                                <p><img src="/img/svg/eye-outline.svg" width={25} alt="eye" /> {video.views.length} Views</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    :
                    <p>No video found</p>
                }
        </div>
    );
};

export default ConnectedVideo;