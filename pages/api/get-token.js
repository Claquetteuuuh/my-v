import axios from 'axios'
import request from 'request'

export default async function handler(req, res) {
    if(req.method === 'GET'){
        // await axios.post(`https://api.cloudflare.com/client/v4/accounts/${process.env.cloudFlareAccount}/stream/direct_upload`, {
        //     headers:{
        //         'Access-Control-Allow-Origin': "*",
        //         'X-Auth-Email': `${process.env.cloudFlareEmail}`,
        //         'X-Auth-Key': `${process.env.cloudFlareAuthKey}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: {"maxDurationSeconds":300, "thumbnailTimestampPct":0.529241,"allowedOrigins":["example.com"],"requireSignedURLs":true,}
            
        // }).then((e) => {
        //     console.log(e)
        //     res.status(200).json(e)
        // })
        // .catch((err) => {
        //     console.log(`${err}`)
        //     res.status(400).json({error: err})
        // })

        var headers = {
            'X-Auth-Email': `${process.env.cloudFlareEmail}`,
            'X-Auth-Key': `${process.env.cloudFlareAuthKey}`,
            'Content-Type': 'application/json'
        };

        var dataString = '{"maxDurationSeconds":300,"thumbnailTimestampPct":0.529241,"requireSignedURLs":true}';
        // var dataString = '{"maxDurationSeconds":300,"thumbnailTimestampPct":0.529241,"allowedOrigins":["my-v.xyz"],"requireSignedURLs":true}';

        var options = {
            url: 'https://api.cloudflare.com/client/v4/accounts/b34aad77a0649956f636aabd25654a21/stream/direct_upload',
            method: 'POST',
            headers: headers,
            body: dataString
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.status(200).json(body)
            }else{
                res.status(400)
            }
        }

        request(options, callback);


    }
}