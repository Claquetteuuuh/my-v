import axios from 'axios'

export default async function handler(req, res) {
    if(req.method === 'GET'){   
        axios.get(`https://api.cloudflare.com/client/v4/accounts/${process.env.cloudFlareAccount}/stream`, {
            headers:{
                'Access-Control-Allow-Origin': "*",
                'X-Auth-Email': `${process.env.cloudFlareEmail}`,
                'X-Auth-Key': `${process.env.cloudFlareAuthKey}`
            }
        })
        .then((e) => {
            // console.log(e.data.result)
            res.status(200).json(e.data.result)
        })
    }else{
        res.status(400).json({message: 'This routes only accept GET'})
    }

}