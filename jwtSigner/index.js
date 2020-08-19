var jwt = require('jsonwebtoken');
const issuer = 'dummy-issur';
const kid = 'my-key-id';
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.handler =  async (event, context) => {
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    }
    console.log(event)
    let payload = JSON.parse(event.body)
    var params = { Bucket: "YOURBUCKET", Key: `key/.private.key` };
    var privateKey = await s3.getObject(params).promise();
    const token = jwt.sign(payload, {
        key: privateKey.Body,
        passphrase: 'superDoggySecret'
    }, {
        algorithm: 'RS256',
        expiresIn: '1 day',
        issuer,
        keyid: kid
    });
    return {
        statusCode,
        body : JSON.stringify({
            token
        }),
        headers,
    };
};
