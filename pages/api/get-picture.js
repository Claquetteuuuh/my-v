import dbConnect from "../../utils/dbConnect"
import User from './schemas/User'
import jwtDecode from 'jwt-decode'
import getCookie from '../../utils/getCookie'
dbConnect()

export default async function handler(req, res){
    if(req.method === 'GET'){
        if(req.headers.cookie){

            const token = getCookie(req.headers.cookie, 'token')
            const { id } = jwtDecode(token)

            User.findOne({_id: id}).then(e => {
                res.status(200).json({picture: e.picture, channel: e.username})
            }).catch((err) => res.status(400).json({error: err}))

        }else{
            res.status(403).json({error: 'not connected'})
        }
    }else{
        if(req.method === "POST"){
            const username = req.body.channel
            User.findOne({username: username}).then(e => {
                res.status(200).json({picture: e.picture, channel: e.username})
            }).catch((err) => res.status(400).json({error: err}))
        }

    }
}