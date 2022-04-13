import React, {useState, useEffect} from 'react';
import styles from '../styles/ConnectedUser.module.css'
import axios from 'axios'

const ConnectedUser = ({userEmail, picture, username, userId}) => {

    const [email, setemail] = useState(userEmail);
    const [thisUsername, setthisUsername] = useState(username);

    const views = 999
    const likes = 40

    const disconnect = () =>{
        axios.get('/api/logout').then((e) => {
            window.location.href = '/'
        })
    }

    return (
        <div className={styles.connectedUser}>
            <div className={styles.left}><div className={styles.imgContainer}><img src={picture} alt={`picture of ${username}`} /></div></div>
            <div className={styles.userInfo}>
                <div className={styles.infoInbox}>
                    <form onSubmit={console.log(email)}>
                        <label htmlFor='emailInput'>Email: </label>
                        <input type="text" id='emailInput' value={email} onChange={(e) => setemail(e.target.value)} />
                        <input type="image" src={"/img/svg/checkbox-outline.svg"} />
                    </form>
                </div>
                <div className={styles.infoInbox}>
                    <form onSubmit={console.log(thisUsername)}>
                        <label htmlFor='usernameInput'>Username: </label>
                        <input type="text" id='usernameInput' value={thisUsername} onChange={(e) => setthisUsername(e.target.value)} />
                        <input type="image" src={"/img/svg/checkbox-outline.svg"} />
                    </form>
                </div>
                <button onClick={(e) => disconnect()}>disconnect</button>
                <div className={styles.counter}>
                    <p>Total views: {views}</p>
                    <p>Total likes: {likes}</p>
                </div>
            </div>
            

        </div>
    );
};

export default ConnectedUser;