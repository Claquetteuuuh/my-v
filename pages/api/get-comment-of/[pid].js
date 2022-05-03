import Video from '../schemas/Videos'
import Comment from '../schemas/Comment'
import dbConnect from '../../../utils/dbConnect'
dbConnect()

export default async function handler(req, res){
    if(req.method === 'GET'){
        const {pid} = req.query
        Video.findOne({cloudflareId: pid}).then(video => {
            Comment.find({videoId: video._id}).then(comments => {
                res.status(200).json(comments)
            }).catch(err => res.status(400).json({error : err}))
        }).catch(err => res.status(400).json({error: err}))
    }else{
        res.status(400).json("this route only accept get")
    }
}