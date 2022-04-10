import { serialize } from "cookie"

export default async function handler(req, res){
    if(req.method === 'GET'){
        res.setHeader("Set-Cookie", serialize('token', '', {path: "/", httpOnly: true, maxAge: 1}))
        res.redirect('/')
    }else{
        res.status(400).json({message: 'This routes only accept GET'})
    }
}