import React,  { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import ConnectedUser from '../components/ConnectedUser';

const ChannelComponent = () => {

    const [isUser, setisUser] = useState(false);
    const [channel, setchannel] = useState();

    const router = useRouter()
    const {name} = router.query

    useEffect(() => {
        axios.post('/api/isuser', {
            channel: name
        }).then(e => {
            console.log(e)
            if(e.data.isUser){
                setchannel(e.data)
                setisUser(true)
            }
        })
    }, []);
    return (
        <div>
            {
                (isUser)?
                    // is it is the user
                    <div>
                        <ConnectedUser channel={channel.username} picture={channel.picture} email={channel.email} />
                    </div>
                :
                // if not the user
                    <div>
                        <p>Not this user</p>
                    </div>
            }
        </div>
    );
};

export default ChannelComponent;