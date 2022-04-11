import dbConnect from "../../utils/dbConnect";
import Videos from './schemas/Videos'
import User from './schemas/User'
dbConnect()

export default async function handler(req, res){
    if(req.method === 'GET'){
        Videos.find({}).then((videos) => {
            const videoList = []
            videos.forEach(video => {
                User.findOne({userId: video.channelId}).then((user) => {
                    const info = {
                        videoId: video.cloudflareId,
                        title: video.title,
                        miniature: video.miniature,
                        channel: user.username,
                        channelPic: user.picture,
                        description: video.description,
                        date: video.date,
                        likes: video.likes,
                        views: video.views,
                        keywords: video.keywords
                    }
                    videoList.push(info)
                    if(videos.length == videoList.length){
                        res.status(200).json(videoList)
                    }
                   
                })
            })
            
        })
        
    }else{
        res.status(400).json({message: 'This routes only accept GET'})
    }
}