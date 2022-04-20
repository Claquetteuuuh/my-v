import jwtDecode from "jwt-decode";
import getCookie from "../../utils/getCookie";
import Video from './schemas/Videos'

export default async function handler(req, res){
    if(req.method === 'POST'){
        const token = getCookie(req.headers.cookie, 'token')
        if(token){
            const {videoId} = req.body

            const {id} = jwtDecode(token)

            const video = await Video.findOne({cloudflareId: videoId || videoId[1]})

            if(video){
                if(video.likes.includes(id)){
                    let likeList = []

                    video.likes.forEach(userId => {
                        if(userId === id){

                        }else{
                            likeList.push(userId)
                        }
                    });

                    await Video.findOneAndUpdate({cloudflareId: videoId || video[1]}, {likes: likeList}).then(e => {
                        res.status(200).json({message: `${id} has been remove from ${videoId}`})
                    }).catch(err => {
                        res.status(400).json({error: err})
                    })
                }else{
                    res.status(400).json({error: 'this user is not in like list'})
                }
            }else{
                res.status(400).json({error: 'this video dont exist'})
            }

        }
    }
}