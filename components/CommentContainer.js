import React, {useEffect, useState, useRef} from 'react';
import styles from '../styles/CommentContainer.module.css'
import axios from 'axios'
import Comment from './Comment'

const CommentContainer = ({videoID}) => {
    const container = useRef(null)
    const arrow = useRef(null)

    const [deployed, setDeployed] = useState(false)
    const [comments, setcomments] = useState([]);
    const [connected, setConnected] = useState(false)
    const [myComment, setMyComment] = useState("")

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

    const postComment = () => {
        if(myComment.trim().length != 0){
            axios.post('/api/add-comment', {
                cloudflareId: videoID,
                content: myComment
            }).then(res => {
                window.location.reload()
            })
        }else{
            alert('Your comment is empty')
        }
    }

    useEffect(() => {
        axios.get(`/api/get-comment-of/${videoID}`).then(res => {
            setcomments(res.data)
        })
        axios.get('/api/get-picture').then(res => {
            setConnected(res.data)
        })
    }, []);

    return (
        <div className={styles.comment}>
            <div className={styles.container}>
                <button onClick={() => deployComment()} >Comments <div ref={el => {arrow = el}} className={styles.arrow}></div></button>
                <div ref={el => {container = el}} className={styles.commentContainer}>
                    {(connected)?
                        <div className={styles.form}>
                            <img src={connected.picture} alt={'my picture'} />
                            <textarea type="text" placeholder='votre commentaire' value={myComment} onChange={e => setMyComment(e.target.value)} />
                            <button onClick={() => postComment()}>Post</button>
                        </div>
                    :false}
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            username={comment.username}
                            content={comment.content}
                            date={comment.date}
                        />
                    )).reverse()}
                </div>
            </div>
        </div>
    );
};

export default CommentContainer;