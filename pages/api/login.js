import User from './schemas/User'
import dbConnect from '../../utils/dbConnect'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import {serialize} from 'cookie'
import requestIp from 'request-ip'
import Log from './schemas/Logs'
dbConnect(); 

export default async function handler(req, res){
    if(req.method === 'POST'){

        const login = async (userEmail, userPassword) => {
            const thisUser = await User.findOne({email: userEmail.toLowerCase()})

            if(thisUser){
                const auth = await bcrypt.compare(userPassword, thisUser.password) // compare the password with the password Hashed
                if(auth){
                    return thisUser
                }
                res.status(400).json({error: "incorrect password"})
                throw Error('incorrect password')
            }
            res.status(400).json({error: "incorrect email"})
            throw Error('incorrect email')
        }

        const maxAge = 604800 // set to 1week (seconds)
        const createToken = (id) =>{
            return jsonwebtoken.sign({id}, 'net ninja secret', {
                expiresIn: maxAge
            })
        }

        const {email, password} = req.body;

        const user = await login(email, password)

        if(user){
            const token = createToken(user._id)
            // res.cookie('jwt', token, {
            //     httpOnly: true,
            //     maxAge: maxAge * 1000
            // })
            res.setHeader("Set-Cookie", serialize('token', token, {path: "/", httpOnly: true, maxAge: maxAge})) // set cookie in the header because of nextjs
            
            const log = new Log({
                message: `Login request on user ${user._id} by ip ${requestIp.getClientIp(req)}`,
                date: Date.now()
            })

            res.status(201).json({user: user._id})

        }else{
            res.status(400).json({message: 'error'})
        }
        
        
    
        
    
    }else{
        res.status(400).json({message: 'This routes only accept POST'})
    }
}