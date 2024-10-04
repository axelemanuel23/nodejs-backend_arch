const boom = require("@hapi/boom");

async function authorizationHandler(req, res, next){
    try{
        if(req.headers.apikey!="axel"){
            throw boom.unauthorized("Auth Failed by APIKEY");
        }
        next();
    }catch(err){
        next(err);
    }
}

module.exports = { authorizationHandler };