import React from 'react';
import styles from '../styles/Video.module.css'
import Link from 'next/link'

const Video = (props) => {
    
    return (
        <div className={styles.Video}>
            <a href={`/view?id=${props.id}`}><div className={styles.miniature}><img src={props.miniature} loading={props.loading} alt={`miniature of ${props.title}`} width='390' height="218" /></div></a>
            <div className={styles.bottom}>
                <Link href={`/channel?name=${props.channelName}`} ><img src={props.channelPicture} loading={props.loading} width={57} height={57} alt={`picture of ${props.channelName}`} /></Link>
                <div className={styles.right}>
                    <a href={`/view?id=${props.id}`} ><h3>{props.title}</h3></a>
                    <Link href={`/channel?name=${props.channelName}`}><p>{props.channelName}</p></Link>
                    <p>{props.views} vues • {props.date}</p>
                </div>
            </div>
        </div>
    );  
};

export default Video;