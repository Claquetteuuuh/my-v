import React from 'react';
import Link from 'next/link'
import styles from '../styles/SuggestedVideo.module.css'

const SuggestedVideo = ({miniature, title, channelPicture, channelName, views, date, description, id}) => {
    return (
        <div className={styles.container}>
            <a href={`/view?id=${id}`} className={styles.miniature} ><img src={miniature} alt={`miniature of ${title}`} /></a>
            <div className={styles.infoVideo}>
                <a href={`/view?id=${id}`}><h3>{title}</h3></a>
                <p>{views} vues • {date}</p>
                <Link href={`/channel?name=${channelName}`}>
                    <div className={styles.channel}>
                        <img height={30} width={30} src={channelPicture} alt={`picture of ${channelName}`} />
                        <p>{channelName}</p>
                    </div>
                </Link>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
};

export default SuggestedVideo;