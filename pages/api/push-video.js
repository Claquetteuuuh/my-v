import Videos from "./schemas/Videos"
import dbConnect from '../../utils/dbConnect'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Log from './schemas/Logs'
import getCookie from '../../utils/getCookie'
dbConnect(); 

export default async function handler(req, res) {
    if(req.method === 'POST'){
        const { id, title, miniature, description, keywords } = JSON.parse(JSON.stringify(req.body))
        
        axios.get(`https://api.cloudflare.com/client/v4/accounts/${process.env.cloudFlareAccount}/stream/${id}`, {
                    headers:{
                        'Access-Control-Allow-Origin': "*",
                        'X-Auth-Email': `${process.env.cloudFlareEmail}`,
                        'X-Auth-Key': `${process.env.cloudFlareAuthKey}`
                    }
        }).then((cloudflareVideo) => {
            if(req.headers.cookie){
                const token = getCookie(req.headers.cookie, 'token')
                const channelId = jwt_decode(token).id
                
                const video = new Videos({
                    cloudflareId: id,
                    title: title,
                    channelId: channelId,
                    miniature: (miniature && miniature != '')?miniature: cloudflareVideo.data.result.thumbnail,
                    description: description,
                    keywords: keywords,
                    date: Date.now(),
                    views: [],
                    likes: []
                })
        
                video.save().then((video) => {
                    const log = new Log({
                        message: `New video: ${video._id} by user: ${channelId}`,
                        date: Date.now()
                    })
                    log.save()
                    res.status(201).json({message: 'the video has been uploaded'})
                }).catch(err => res.status(400).json({error: err}))
            }else{
                res.status(403).json({message: 'you must be connected to post a video'})
            }
        
        })
        
        
    }else{
        res.status(400).json({message: 'This routes only accept POST'})
    }
}