import axios from 'axios'

export default async function handler(req, res) {
    if(req.method === 'GET'){   
        axios.get(`https://api.cloudflare.com/client/v4/accounts/b34aad77a0649956f636aabd25654a21/stream`, {
            headers:{
                'Access-Control-Allow-Origin': "*",
                'X-Auth-Email': "th.biabiany.dev@gmail.com",
                'X-Auth-Key': "126696776eccea97c410b5b001deafebf6bdd"
            }
        })
        .then((e) => {
            res.status(200).json(e.data.result)
        })
    }

}