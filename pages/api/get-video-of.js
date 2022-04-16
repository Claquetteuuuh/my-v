import dbConnect from '../../utils/dbConnect'
import Video from './schemas/Videos'
import User from './schemas/User'
dbConnect()

export default async function handler(req, res){

    if(req.method === 'POST'){
        const {userId, username} = req.body
        if(userId){
            const videos = await Video.find({channelId: userId})
            if(videos){
                res.status(200).json({userId: userId, videos: videos})
            }else{
                res.status(400).json({error: 'cette user n\'a pas été trouvé !'})
            }
        }else{
            if(username){
                const user = await User.findOne({username: username})
                if(user){
                    const videos = await Video.find({channelId: user._id})
                    if(videos){
                        res.status(200).json({videos: videos})
                    }else{
                        res.status(400).json({error: 'cette user n\'a pas été trouvé !'})
                    }
                }
            }
        }
        

        

    }else{
        res.status(400).json({message: 'this route only accept POST request'})
    }
}