import React from 'react';
import styles from '../styles/editVideo.module.css'
import Navbar from '../components/Navbar'
import EditVideoForm from '../components/EditVideoForm';

const editVideo = () => {
    return (
        <div className={styles.editVideo}>
            <Navbar />

            <EditVideoForm />
        </div>
    );
};

export default editVideo;