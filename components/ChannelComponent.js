import React,  { useEffect, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';
import ConnectedUser from '../components/ConnectedUser';

const ChannelComponent = () => {

    const [isUser, setisUser] = useState(false);
    const [channel, setchannel] = useState();

    const router = useRouter()
    const queryKey = 'name';
    const name = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

    useEffect( async () => {
        await axios.post('/api/isuser', {
            channel: name
        }).then(e => {
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
                        <ConnectedUser userid={channel.userId} username={channel.username} picture={channel.picture} userEmail={channel.email} />
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