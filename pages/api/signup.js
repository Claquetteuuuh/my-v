import User from './schemas/User'
import dbConnect from '../../utils/dbConnect'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import {serialize} from "cookie"
dbConnect(); 

export default async function handler(req, res) {
    if(req.method === 'POST'){
        // const { username, email, password, picture } = req.body

        bcrypt.hash(req.body.password, 10).then((hash) => { // create a password hash with bcrypt
            User.find({}).then((users) => { // get all users to create an id
                const user = new User({
                    userId: Number(users[users.length - 1].userId) + 1,
                    username: req.body.username,
                    picture: req.body.picture,
                    email: req.body.email.toLowerCase(),
                    password: hash
                })
                user.save().then(() => { // save user in db
                    User.findOne({email: req.body.email.toLowerCase()}).then((thisUser) => {
                        const maxAge = 18000 // set to 5 hours (seconds)
                        const createToken = (id) =>{
                            return jsonwebtoken.sign({id}, 'net ninja secret', {
                                expiresIn: maxAge
                            })
                        }

                        const token = createToken(thisUser.userId)
                        res.setHeader("Set-Cookie", serialize('token', token, {path: "/", httpOnly: true, maxAge: maxAge})) // set cookie in the header because of nextjs
                        
                        res.status(201).json({user: thisUser.userId})
                    }).catch((err) => console.log(err))
                    
                }).catch((err) => res.status(400).json({error: `save error ${err}`}))
            }).catch((err) => {
                res.status(500)
                console.log(err);
            })
            

        }).catch((err) => res.status(500).json({error: `hash error ${err}`}))
    }else{
        res.status(400).json({message: 'This routes only accept POST'})
    }
}
  