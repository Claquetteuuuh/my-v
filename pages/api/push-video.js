import Videos from "./schemas/Videos"
import dbConnect from '../../utils/dbConnect'
import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
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
                const infoCookie = atob(req.headers.cookie.split('.')[1])

                const video = new Videos({
                    cloudflareId: id,
                    title: title,
                    channelId: JSON.parse(infoCookie).id,
                    miniature: (miniature)?miniature: cloudflareVideo.data.result.thumbnail,
                    description: description,
                    keywords: keywords,
                    views: 0,
                    likes: 0
                })
        
                video.save().then(() => {
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