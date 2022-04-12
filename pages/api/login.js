import User from './schemas/User'
import dbConnect from '../../utils/dbConnect'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import {serialize} from 'cookie'
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

        const maxAge = 18000 // set to 5 hours (seconds)
        const createToken = (id) =>{
            return jsonwebtoken.sign({id}, 'net ninja secret', {
                expiresIn: maxAge
            })
        }

        const {email, password} = req.body;

        const user = await login(email, password)
        console.log();

        if(user){
            const token = createToken(user.userId)
            // res.cookie('jwt', token, {
            //     httpOnly: true,
            //     maxAge: maxAge * 1000
            // })
            res.setHeader("Set-Cookie", serialize('token', token, {path: "/", httpOnly: true, maxAge: maxAge})) // set cookie in the header because of nextjs
            
            res.status(201).json({user: user.userId})

        }else{
            res.status(400).json({message: 'error'})
        }
        
        
    
        
    
    }else{
        res.status(400).json({message: 'This routes only accept POST'})
    }
}