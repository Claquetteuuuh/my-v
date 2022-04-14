import React, {useState, useEffect} from 'react';
import styles from '../styles/ConnectedUser.module.css'
import axios from 'axios'

const ConnectedUser = ({userEmail, picture, username, userId}) => {

    const [email, setemail] = useState(userEmail);
    const [thisUsername, setthisUsername] = useState(username);

    const views = 999
    const likes = 40

    const updateUserInfo = (e, type) => {
        e.preventDefault()
        switch (type) {
            case 'email':
                axios.post('/api/update-user', {
                    oldEmail: userEmail,
                    newEmail: email
                }).then(e => {
                    window.location.href = `/channel?name=${username}`
                }).catch(e => {
                    console.log(e)
                })
                break;
        
            case 'username':
                axios.post('/api/update-user', {
                    oldUsername: username,
                    newUsername: thisUsername
                }).then(e => {
                    window.location.href = `/channel?name=${thisUsername}`
                }).catch(e => {
                    console.log(e)
                })
                break;
        
            default:
                break;
        }
    }

    const disconnect = () =>{
        axios.get('/api/logout').then((e) => {
            window.location.href = '/'
        })
    }

    return (
        <div className={styles.connectedUser}>
            <div className={styles.left}><div className={styles.imgContainer}><img src={picture} alt={`picture of ${username}`} /></div></div>
            <div className={styles.userInfo}>
                <div className={styles.infoInboxContainer}>
                    <div className={styles.infoInbox}>
                        <form onSubmit={(e) => updateUserInfo(e, 'email')}>
                            <label htmlFor='emailInput'>Email: </label>
                            <input type="text" id='emailInput' value={email} onChange={(e) => setemail(e.target.value)} />
                            <input type="image" src={"/img/svg/checkbox-outline.svg"} />
                        </form>
                    </div>
                    <div className={styles.infoInbox}>
                        <form onSubmit={(e) => updateUserInfo(e, 'username')}>
                            <label htmlFor='usernameInput'>Username: </label>
                            <input type="text" id='usernameInput' value={thisUsername} onChange={(e) => setthisUsername(e.target.value)} />
                            <input type="image" src={"/img/svg/checkbox-outline.svg"} />
                        </form>
                    </div>
                    <button onClick={(e) => disconnect()}>disconnect</button>
                </div>
                <div className={styles.counter}>
                    <p>Total views: <span>{views}</span></p>
                    <p>Total likes: <span>{likes}</span></p>
                </div>
            </div>
            

        </div>
    );
};

export default ConnectedUser;