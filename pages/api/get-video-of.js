import dbConnect from '../../utils/dbConnect'
import Video from './schemas/Videos'
dbConnect()

export default async function handler(req, res){

    if(req.method === 'POST'){
        const {userId} = req.body
        console.log(req.body)

        const videos = await Video.find({channelId: userId})

        if(videos){
            res.status(200).json({userId: userId, videos: videos})
        }else{
            res.status(400).json({error: 'cette user n\'a pas été trouvé !'})
        }

    }else{
        res.status(400).json({message: 'this route only accept POST request'})
    }
}