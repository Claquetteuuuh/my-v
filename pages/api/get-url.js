import request from "request";

export default function handler(req, res) {

    console.log('request')

    if(req.method === 'POST'){

        console.log("Post request at /get-url !")

        var headers = {
            'X-Auth-Email': `${process.env.cloudFlareEmail}`,
            'X-Auth-Key': `${process.env.cloudFlareAuthKey}`,
            'Content-Type': 'application/json',
            'Tus-Resumable': '1.0.0',
            'Upload-Length': req.headers.filesize,
        };

        var options = {
            url: 'https://api.cloudflare.com/client/v4/accounts/b34aad77a0649956f636aabd25654a21/stream?direct_user=true',
            method: 'POST',
            headers: headers,
        };


        function getUrlCallback(error, response, body) {
            if (!error && response.statusCode == 201) {
                console.log('it work');
                res.status(201).json(response)
                console.log(response);
            }else{
                console.log('it dont work');
            }
        }


        request(options, getUrlCallback);

    }
}
  