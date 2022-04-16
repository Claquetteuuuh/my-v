import dbConnect from "../../utils/dbConnect"
import User from './schemas/User'
import jwtDecode from 'jwt-decode'
dbConnect()

export default async function handler(req, res){
    if(req.method === 'GET'){
        if(req.headers.cookie){
            const token = req.headers.cookie.split('=')[1]
            const {id } = jwtDecode(token)

            User.findOne({_id: id}).then(e => {
                res.status(200).json({picture: e.picture, channel: e.username})
            }).catch((err) => res.status(400).json({error: err}))

        }else{
            res.status(403).json({error: 'not connected'})
        }
    }else{
        res.status(200).json({message: 'this routes only accept GET'})
    }
}