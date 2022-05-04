import React, {useEffect, useState} from 'react';
import styles from '../styles/Comment.module.css'
import axios from 'axios'

const Comment = ({username, content, date}) => {
    const [picture, setpicture] = useState();

    const dateParser = (date) => {

        let newDate = new Date(date)
        let today = Date.now()
        let date1 = new Date(newDate)
        let date2 = new Date(today)
        var difference = date1.getTime() - date2.getTime();
        
        if(- Math.ceil(difference / (1000 * 3600 * 24)) > 30){
            let days = - Math.ceil(difference / (1000 * 3600 * 24))
            let month = 1
            while(days-30 >29){
                days = days-30
                month ++
            }
            return (month > 1)?`${month} months`:`${month} month` 
        }else{
            return (- Math.ceil(difference / (1000 * 3600 * 24)) > 1)?`${- Math.ceil(difference / (1000 * 3600 * 24))} days`: `${- Math.ceil(difference / (1000 * 3600 * 24))} day`
        } 
    }

    useEffect(() => {
        axios.post('/api/get-picture', {
            channel: username
        }).then(res => {
            setpicture(res.data.picture)
        })
    }, []);

    return (
        <div className={styles.comment}>
            <img src={(picture)?picture:'/img/svg/random-user.jpg'} alt={`picture of ${username}`} />    
            <div className={styles.info}>
                <div className={styles.top}>
                    <p>{username}</p>
                    <p>•</p>
                    {(dateParser(date) == "0 day")? <p>today</p> : <p>{dateParser(date)} ago</p>}
                </div>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default Comment;