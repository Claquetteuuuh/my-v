import React from 'react';
import styles from '../styles/Video.module.css'
import Link from 'next/link'

const Video = (props) => {
    return (
        <div className={styles.Video}>
            <Link href={`/view?id=${props.id}`}><div className={styles.miniature}><img src={props.miniature} alt={`miniature of ${props.title}`} height="218" /></div></Link>
            <div className={styles.bottom}>
                <Link href={`/channel?name=${props.channelName}`} ><img src={props.channelPicture} alt={`picture of ${props.channelName}`} /></Link>
                <div className={styles.right}>
                    <Link href={`/view?id=${props.id}`} ><h3>{props.title}</h3></Link>
                    <Link href={`/channel?name=${props.channelName}`}><p>{props.channelName}</p></Link>
                    <p>{props.views} vues • {props.date}</p>
                </div>
            </div>
        </div>
    );
};

export default Video;