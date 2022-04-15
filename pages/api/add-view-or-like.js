import Video from './schemas/Videos'
import User from './schemas/User'
import jwtDecode from 'jwt-decode';

export default async function handler(req, res){
    if(req.method === 'POST'){
        const { videoId, type } = req.body

        if(req.headers.cookie){
            const token = req.headers.cookie.split('=')[1]
            const { id } = jwtDecode(token)

            const user = await User.findOne({userId: id})
            const video = await Video.findOne({cloudflareId: videoId})
            const username = user.username

            switch (type) {
                case 'like':

                    const likes = video.likes
                    
                    if(!likes.includes(username)){
                        likes.push(username)
                        await Video.findOneAndUpdate({cloudflareId: videoId}, {likes: likes})
                        res.status(201).json({message: `${username} was added to ${videoId}'s likes list with success`})
                    }else{
                        res.status(200).json({message: `${username} is already in ${videoId}'s likes list`})
                    }
                    
                    break;
                    
                    case 'view':
                        
                        const views = video.views
                        
                        if(!views.includes(username)){
                            views.push(username)
                            await Video.findOneAndUpdate({cloudflareId: videoId}, {views: views})
                            res.status(201).json({message: `${username} was added to ${videoId}'s views list with success`})
                        }else{
                            res.status(200).json({message: `${username} is already in ${videoId}'s views list`})
                        }
    
                    break
            }

        }else{
            res.status(403).json({error: 'not connected'})
        }
        
    }else{
        res.status(400).json({error: 'this route only accept POST request'})
    }
}