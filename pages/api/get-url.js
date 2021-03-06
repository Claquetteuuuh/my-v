import request from "request";

export default function handler(req, res) {

    if(req.method === 'POST'){

        let headers = {
            'X-Auth-Email': `${process.env.cloudFlareEmail}`,
            'X-Auth-Key': `${process.env.cloudFlareAuthKey}`,
            'Content-Type': 'application/json',
            'Tus-Resumable': '1.0.0',
            'Upload-Length': req.headers['upload-length'],
            "meta":{
                "name": `${req.headers['upload-metadata']}`
            }
            
        };

        let options = {
            url: 'https://api.cloudflare.com/client/v4/accounts/b34aad77a0649956f636aabd25654a21/stream?direct_user=true',
            method: 'POST',
            headers: headers,
           
        };

        function getUrlCallback(error, response, body) {

            const url = new URL(response.headers.location);
            const id = url.pathname.split('/')[2]

            if (!error && response.statusCode == 201) {
                // console.log(res);
                let headers = Object.entries(response['headers']);
                headers.forEach(header => {
                    res.setHeader(header[0], header[1])
                });
                res.status(201).end()


            }else{
                console.log(body)
                res.status(400).json({message: 'not enough stockage'})
            }
        }



        request(options, getUrlCallback);

    }else{
        res.status(400).json({message: 'This routes only accept POST'})
    }
}
  