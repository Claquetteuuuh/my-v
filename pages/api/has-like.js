import jwtDecode from 'jwt-decode'
import getCookie from '../../utils/getCookie'
import User from './schemas/User'
import Video from './schemas/Videos'

export default async function handler(req, res){
    if(req.method === 'POST'){
        const token = getCookie(req.headers.cookie, 'token')
        if(token){
            
            const {cdnId} = req.body
            
            const { id } = jwtDecode(token)

            const user = await User.findOne({_id: id})
            const video = await Video.findOne({cloudflareId: cdnId || cdnId[1]})

            if(user){
                if(video){
                    if(video.likes.includes(user._id)){
                        res.status(200).json({inLikeList: true})
                    }else{
                        res.status(200).json({inLikeList: false})
                    }
                }else{
                    res.status(400).json({error: 'video not found'})
                }
            }else{
                res.status(400).json({error: 'user not found'})
            }

        }
    }
}