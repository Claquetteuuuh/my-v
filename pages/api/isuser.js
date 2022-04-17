import jwtDecode from "jwt-decode";
import User from './schemas/User'
import getCookie from "../../utils/getCookie";

export default async function handler(req, res){
    if(req.method === 'POST'){
        if(req.headers.cookie){
            const token = getCookie(req.headers.cookie, 'token')
            const {id } = jwtDecode(token)

            const {channel} = req.body
            console.log(channel);
            const user = await User.findOne({username: channel})
            if(user){
                if(id == user._id){
                    res.status(200).json({isUser: true, picture: user.picture, userId: user._id, email: user.email, username: user.username})
                }else{
                    res.status(200).json({username: user.username, picture: user.picture})
                }
            }else{
                res.status(200).json({message: 'any account name'})
            }
        }else{
            const {channel} = req.body
            const user = await User.findOne({username: channel})
            res.status(200).json({username: user.username, picture: user.picture})
            
        }
    }else{
        res.status(400).json({message: "this route only accept post request"})
    }
}