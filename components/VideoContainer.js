import React, { useEffect, useState } from 'react';
import styles from '../styles/VideoContainer.module.css'
import Video from './Video';
import axios from 'axios'

const VideoContainer = () => {
    
    const [data, setdata] = useState([]);

    useEffect(() => {
        axios.get('/api/get-stream')
        .then((res) => {
            setdata(res.data)
        })

    }, [])



    return (
        <div className={styles.VideoContainer}>
            {/* <button onClick={()=>{console.log(data)}}></button> */}
            
            {data.map((video) => (
                
                <Video 
                    miniature={video.thumbnail}
                    title={video.meta.filename}
                    channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                    channelName="Lorem susu"
                    views="10M"
                    date="12/12/1212"
                    id={video.uid}
                />
            ))}
            {/* <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="c054f2a7-7352-41f8-9f93-8cd1051cf198"
            /> */}
            {/* <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="5ae82bdd-9e3c-4fcb-b2e1-d5b7b164214e"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="6b28c8c7-8046-4ecc-b14c-f385040cbb20"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="4eed659b-e4c3-473f-a98e-2120410af32a"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="dbc4ae92-fd24-4942-b32b-2532235b2390"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="f7fa7fc7-33a6-4a42-b9db-8e6adb92eaf8"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="dbdd818b-8f8e-44c4-8ba7-e506b462ef3b"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="f781e64e-aa3b-4e07-bda2-046f2710a6b9"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="2696dd33-df46-408c-86cc-6fcf229e26b0"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="9ccec9cf-46ad-4989-8651-8c8bfd8b677a"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="9b00b6a6-e898-40d0-82a5-ea197c113539"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="0fa5a7aa-3c4b-43f1-bd4a-3645f308f0e3"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="3ab156f8-7302-4cfc-813d-46f119f5a2a2"
            />
            <Video 
                miniature="https://media.discordapp.net/attachments/892425478386876526/954939935838855218/miniature.png"
                title="Lorem ipsum dolor sit amet."
                channelPicture="https://media.discordapp.net/attachments/892425478386876526/954940208795758672/image_1.png"
                channelName="Lorem susu"
                views="10M"
                date="12/12/1212"
                id="9ada35bc-2f5d-4ffb-8f20-7c2bdc9df11a"
            /> */}
        </div>
    );
};

export default VideoContainer;