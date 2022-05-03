import User from './schemas/User'
import Video from './schemas/Videos'
import Comment from './schemas/Comment'
import Log from './schemas/Logs'
import getCookie from '../../utils/getCookie'
import jwtDecode from 'jwt-decode'
import dbConnect from '../../utils/dbConnect'
dbConnect()

export default async function handler(req, res){
    if (req.method === 'POST'){
        const token = getCookie(req.headers.cookie, 'token')
        if(token){

            const {id} = jwtDecode(token)
            const {cloudflareId, content} = req.body

            User.findOne({_id: id}).then(user => {

                Video.findOne({cloudflareId: cloudflareId}).then(video =>{

                    const comment = new Comment({
                        username: user.username,
                        videoId: video._id,
                        content: content,
                        date: Date.now()
                    })
                    comment.save().then(e => {
                        res.status(201).json({message: `your comment has been added`})
                        const log = new Log({
                            message: `new comment from user ${user._id} on video ${video._id}`,
                            date: Date.now()
                        })
                        log.save()
                    })
                })
    
            }).catch(err => console.log(err))
        }else{
            res.status(403).json({error: "invalid token"})
        }
    }else{
        res.status(400).json({error: "this route only accept post request"})
    }
}