function logErrors(err, req, res, next){
    console.group("LOGS-ERRORS");
    console.error(err.message);
    console.groupEnd("LOGS-ERRORS");
    next(err);
}

function boomErrorHandler(err, req, res, next){
    if(err.isBoom){
        console.group("BOOM ERROR");
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
        console.groupEnd("BOOM ERROR");
        return
    }
    next(err);
}

function mongoErrorHandler(err, req, res, next){
    if(err.serviceError){
        console.group("Mongo Error Handler");
        res.status(400).json({
            message: "Bad Request"
        });
        console.groupEnd("Mongo Error Handler");
        return;
    }
    next(err);
}

function defaultErrorHandler(err, req, res, next){
    console.group("ERROR HANDLER");
    res.status(500)
        .json({
            message: "Error",
            reason: "",
        });
    console.groupEnd("ERROR HANDLER");
}

module.exports = { logErrors, boomErrorHandler, mongoErrorHandler, defaultErrorHandler };