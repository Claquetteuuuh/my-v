import dbConnect from "../../utils/dbConnect"
import User from './schemas/User'
dbConnect()

export default async function handler(req, res){
    if(req.method === 'GET'){
        if(req.headers.cookie){
            const id = JSON.parse(atob(req.headers.cookie.split('.')[1])).id
            console.log(id);

            User.findOne({userId: id}).then(e => {
                res.status(200).json({picture: e.picture, channel: e.username})
            }).catch((err) => res.status(400).json({error: err}))

        }else{
            res.status(403).json({error: 'not connected'})
        }
    }
}