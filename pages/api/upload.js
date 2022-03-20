export default function handler(req, res) {
    if(req.method === 'POST'){
        if(req.files === null){
    
            res.status(400).json({ msg: 'No file uploaded'})
        }

        const file = req.files.file

        file.mv(`${__dirname}/../../../../public/videos/${file.id}`, err =>{
            if(err){
                console.error(err)
                res.status(500).send(err)
            }

            res.json({fileName: file.name, filePath: `/videos/${file.id}`})
        })

    }else{
        res.status(200).json()
    }
    
    

    
}
  