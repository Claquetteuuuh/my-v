import User from './schemas/User'

export default async function handler(req, res){
    if(req.method === 'POST'){
        if(req.body.oldEmail){
            await User.findOneAndUpdate({email: req.body.oldEmail}, {email: req.body.newEmail} ).then(async (user) => {
                res.status(200).json(await User.findOne({email: req.body.newEmail}))
            }).catch((err) => {
                console.log(err)
                res.status(400).json({error: err})
            })
            

        }
        if(req.body.oldUsername){
            await User.findOneAndUpdate({username: req.body.oldUsername}, {username: req.body.newUsername}).then(async (user) => {
                res.status(200).json(await User.findOne({username: req.body.newUsername}))
            }).catch((err) => {
                console.log(err)
                res.status(400).json({error: err})
            })
        
        }
    }else{
        res.status(400).json({message: 'this route only accept POST request'})
    }
}