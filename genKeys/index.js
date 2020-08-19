const { generateKeyPairSync } = require('crypto');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

const putItem = async (params) => {
    return new Promise((resolve, reject) => {
        s3.putObject(params, function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                console.log(data)
                resolve(data)
            }
        });
    })
}

(async () => {
    try {
        const { publicKey, privateKey } = generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase : 'superDoggySecret'
            }
        });
        
        var params1 = { Bucket: "YOURBUCKET", Key: `key/.private.key`, Body:  privateKey};
        var params2 = { Bucket: "YOURBUCKET", Key: `key/.public.key.pem`, Body:  publicKey};
     
        await putItem(params1);
        await putItem(params2);


    } catch (err) {
        console.log(err.message);
    }
})();


