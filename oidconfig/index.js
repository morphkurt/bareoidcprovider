const issuer = 'issuer';

exports.handler =  async (event, context) => {
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    }
    let config = {
        issuer,
        jwks_uri: '<jwks>',
        authorization_endpoint: '<authendpoint>',
        response_types_supported: ['token'],
        id_token_alg_values_supported : ['RS256'],
        claims_supported: ["aud","auth_time","created_at","email","email_verified","exp","family_name","given_name","iat","identities","iss","name","nickname","phone_number","picture","sub"]
    }
    return {
        statusCode,
        body : JSON.stringify(config),
        headers,
    };
};
