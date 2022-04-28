import dbConnect from '../../utils/dbConnect'
import Video from './schemas/Videos'
import User from './schemas/User'
import Log from './schemas/Logs'
import jwtDecode from 'jwt-decode';
import getCookie from '../../utils/getCookie'
dbConnect()

export default async function handler(req, res){
    if(req.method === 'POST'){
        const { videoId, type } = req.body

        if(req.headers.cookie){
            const token = getCookie(req.headers.cookie, 'token')
            const { id } = jwtDecode(token)

            const user = await User.findOne({_id: id})
            if(user){
                const video = await Video.findOne({cloudflareId: videoId})
                const userId = id

                switch (type) {
                    case 'like':

                        const likes = video.likes
                        
                        if(!likes.includes(userId)){
                            likes.push(userId)
                            const video = await Video.findOneAndUpdate({cloudflareId: videoId}, {likes: likes})
                            
                            const log = new Log({
                                message: `New like of id: ${userId} in video: ${video._id}`,
                                date: Date.now()
                            })
                            await log.save()
                            
                            res.status(201).json({message: `${userId} was added to ${videoId}'s likes list with success`})
                        }else{
                            res.status(200).json({message: `${userId} is already in ${videoId}'s likes list`})
                        }
                        
                        break;
                        
                        case 'view':
                            
                            const views = video.views
                            
                            if(!views.includes(userId)){
                                views.push(userId)
                                const video = await Video.findOneAndUpdate({cloudflareId: videoId}, {views: views})
                                
                                const log = new Log({
                                    message: `New view of id: ${userId} in video: ${video._id}`,
                                    date: Date.now()
                                })
                                await log.save()
                                
                                res.status(201).json({message: `${userId} was added to ${videoId}'s views list with success`})
                            }else{
                                res.status(200).json({message: `${userId} is already in ${videoId}'s views list`})
                            }
        
                        break
                }
            }else{
                res.status(400).json({error: 'this id dont exist in db'})
            }
            

        }else{
            res.status(403).json({error: 'not connected'})
        }
        
    }else{
        res.status(400).json({error: 'this route only accept POST request'})
    }
}