import React, {useEffect, useState, useRef} from 'react';
import styles from '../styles/CommentContainer.module.css'
import axios from 'axios'
import Comment from './Comment'

const CommentContainer = ({videoID}) => {
    const container = useRef(null)
    const arrow = useRef(null)

    const [deployed, setDeployed] = useState(false)
    const [comments, setcomments] = useState([]);

    const deployComment = () => {
        if(deployed){
            container.style.display = 'none'
            arrow.style.transform = 'rotate(-135deg)'
            arrow.style.marginBottom = '-15px'
            setDeployed(false)
        }else{
            container.style.display = 'block'
            arrow.style.transform = 'rotate(45deg)'
            arrow.style.marginBottom = '0'
            setDeployed(true)
        }
    }

    useEffect(() => {
        console.log(videoID);
        axios.get(`/api/get-comment-of/${videoID}`).then(res => {
            setcomments(res.data)
        })
    }, []);

    return (
        <div className={styles.comment}>
            <div className={styles.container}>
                <button onClick={() => deployComment()} >Comments <div ref={el => {arrow = el}} className={styles.arrow}></div></button>
                <div ref={el => {container = el}} className={styles.commentContainer}>
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            username={comment.username}
                            content={comment.content}
                            date={comment.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentContainer;