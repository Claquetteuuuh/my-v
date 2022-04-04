import User from './schemas/User'
import dbConnect from '../../utils/dbConnect'
import bcrypt from 'bcrypt'
dbConnect(); 

export default async function handler(req, res) {
    if(req.method === 'POST'){
        // const { username, email, password } = req.body

        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            user.save().then(() => res.status(201).json({message: 'user created'})).catch((err) => res.status(400).json({error: err}))
        }).catch((err) => res.status(500).json({error: err}))
    }
}
  