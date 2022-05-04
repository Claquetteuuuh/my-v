import Video from './schemas/Videos'
import User from './schemas/User'
import getCookie from '../../utils/getCookie'
import dbConnect from '../../utils/dbConnect'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
dbConnect()

export default async function handler(req, res){
    if(req.method === 'POST'){
        const token = jwtDecode(getCookie(req.headers.cookie, 'token')).id
        if(token){
            const {id} = req.body
            await Video.findOne({_id: id}).then( async video => {
                const user = await User.findOne({_id: token})
                if (user){
                    if(user._id == video.channelId){
                        console.log(video.cloudflareId);
                        axios.delete(`https://api.cloudflare.com/client/v4/accounts/${process.env.cloudFlareAccount}/stream/${video.cloudflareId}`, {
                            headers:{
                                'Access-Control-Allow-Origin': "*",
                                'X-Auth-Email': `${process.env.cloudFlareEmail}`,
                                'X-Auth-Key': `${process.env.cloudFlareAuthKey}`
                            }
                        }).then(async () => {
                            await Video.findOneAndDelete({_id: id}).then(() => res.status(200).json({message: 'this video has been deleted'})).catch(err => res.status(400).json(err))
                        }).catch(err => {
                            console.log(err)
                            res.status(400).json(err)
                        })
                    }else{
                        res.status(403).json({error: 'You can not delete this video'})
                    }
                }else{
                    res.status(403).json({error: 'token invalid'})
                }
            }).catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
        }else{
            res.status(403).json({error: 'not connected'})
        }
    }
}