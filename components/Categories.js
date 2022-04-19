import React from 'react';
import Video from './Video';
import styles from '../styles/Categories.module.css'

const Categories = ({keyword, data}) => {

    
    const dateParser = (date) => {

        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            year: "numeric",
            month: 'numeric',
            day: 'numeric',
        })
        return newDate
    }

    return (
        <div className={styles.Categories}>
            <h3 className={styles.title}>{keyword}</h3>
            <div className={styles.videoContainer}>
                {
                    data.map((video) => (
                    
                        (keyword.toLowerCase() != 'any')?
                            (video.keywords.includes(keyword.toLowerCase()))? 
                            <Video 
                                key={video.videoId}
                                miniature={video.miniature}
                                title={video.title}
                                channelPicture={(video.channelPic)? video.channelPic : '/img/svg/random-user.jpg'}
                                channelName={video.channel}
                                views={video.views.length}
                                date={(video.date)? dateParser(video.date): '00/00/00'}
                                id={video.videoId}
                            
                            />:false
                        :          
                            <Video 
                                key={video.videoId}
                                miniature={video.miniature}
                                title={video.title}
                                channelPicture={(video.channelPic)? video.channelPic : '/img/svg/random-user.jpg'}
                                channelName={video.channel}
                                views={video.views.length}
                                date={(video.date)? dateParser(video.date): '00/00/00'}
                                id={video.videoId}
                            
                            />   
                    )).reverse()
                }
            </div>
        </div>
    );
};

export default Categories;