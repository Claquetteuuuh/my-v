import User from './schemas/User'
import dbConnect from '../../utils/dbConnect'
import bcrypt from 'bcrypt'
dbConnect(); 

export default async function handler(req, res) {
    if(req.method === 'POST'){
        // const { username, email, password } = req.body

        bcrypt.hash(req.body.password, 10).then((hash) => { // create a password hash with bcrypt
            User.find({}).then((users) => { // get all users to create an id
                const user = new User({
                    userId: users.length + 1,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                })
                user.save().then(() => { // save user in db
                    User.findOne({email: req.body.email}).then((thisUser) => res.status(201).json({message: `user created id: ${thisUser.userId}`})).catch((err) => console.log(err))
                    
                }).catch((err) => res.status(400).json({error: `save error ${err}`}))
            }).catch((err) => {
                res.status(500)
                console.log(err);
            })
            

        }).catch((err) => res.status(500).json({error: `hash error ${err}`}))
    }
}
  