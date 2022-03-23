import request from "request";

export default function handler(req, res) {
    if(req.method === 'POST'){
        var headers = {
            'X-Auth-Email': `${process.env.cloudFlareEmail}`,
            'X-Auth-Key': `${process.env.cloudFlareAuthKey}`,
            'Content-Type': 'application/json'
        };

        var dataString = '{"maxDurationSeconds":300,"thumbnailTimestampPct":0.529241,"allowedOrigins":["example.com"],"requireSignedURLs":true}';

        var options = {
            url: 'https://api.cloudflare.com/client/v4/accounts/b34aad77a0649956f636aabd25654a21/stream/direct_upload',
            method: 'POST',
            headers: headers,
            body: dataString
        };


        function getUrlCallback(error, response, body) {
            if (!error && response.statusCode == 200) {
                options.url = JSON.parse(body).result.uploadURL

            }else{
                res.status(400)
            }
        }

        function uploadResult(error, response, body){
            if(!error && response.statusCode == 200){
                console.log(response)
                console.log(options)
            }else{
                console.log(options)
                // console.log(response)
            }
        }

        request(options, getUrlCallback);
        options.body = req.body
        request(options, uploadResult)
    }
}
  