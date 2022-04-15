import jwtDecode from "jwt-decode";
import User from './schemas/User'

export default async function handler(req, res){
    if(req.method === 'POST'){
        if(req.headers.cookie){
            const token = req.headers.cookie.split('=')[1]
            const {id } = jwtDecode(token)

            const {channel} = req.body
            console.log(channel);
            const user = await User.findOne({username: channel})
            if(user){
                if(id == user.userId){
                    res.status(200).json({isUser: true, picture: user.picture, userId: user.userId, email: user.email, username: user.username})
                }else{
                    res.status(200).json({picture: user.picture})
                }
            }else{
                res.status(200).json({message: 'any account name'})
            }
        }else{
            res.status(200).json({message: 'your not connected'})
        }
    }else{
        res.status(400).json({message: "this route only accept post request"})
    }
}