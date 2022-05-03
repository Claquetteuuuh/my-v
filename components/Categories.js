import React from 'react';
import Video from './Video';
import styles from '../styles/Categories.module.css'

const Categories = ({keywords, data, loading}) => {

    
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
            <div className={styles.videoContainer}>
                {
                    (keywords != 'any')?
                        keywords.map((keyword) => (
                            data.map((video) => (
                        
                                (video.keywords.includes(keyword.toLowerCase()))? 
                                <Video 
                                    loading={loading}
                                    key={video.videoId}
                                    miniature={video.miniature}
                                    title={video.title}
                                    channelPicture={(video.channelPic)? video.channelPic : '/img/svg/random-user.jpg'}
                                    channelName={video.channel}
                                    views={video.views.length}
                                    date={(video.date)? dateParser(video.date): '00/00/00'}
                                    id={video.videoId}
                                    
                                />:false
                            )).reverse()
                        ))
                    :data.map((video) => (
                        
                        <Video 
                            loading={loading}
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