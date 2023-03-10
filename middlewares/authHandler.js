const boom = require("@hapi/boom");

async function authorizationHandler(req, res, next){
    try{
        if(req.headers.apikey!=process.env.APIKEY){
            throw boom.unauthorized("Auth Failed");
        }
        next();
    }catch(err){
        next(err);
    }
}

module.exports = { authorizationHandler };