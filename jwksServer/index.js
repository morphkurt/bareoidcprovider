var pem2jwk = require('pem-jwk').pem2jwk;
const kid = 'my-key-id';
const issuer = 'issuer';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();


exports.handler =  async (event, context) => {
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    }
    let body;
        var params = { Bucket: "YOURBUCKET", Key: `key/.public.key.pem` };
        var publicKey = await s3.getObject(params).promise();
        const jwk = pem2jwk(publicKey.Body);
        var jwks = {
            keys: [{
                ...jwk,
                kid,
                use: 'sig'
            }]
        }
        body = JSON.stringify(jwks)

   
    console.log(body)
    return {
        statusCode,
        body,
        headers,
    };

};