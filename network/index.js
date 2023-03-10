const express = require("express");
const tecnomixRouter = require("./usersRouting");
const { authorizationHandler } = require("../middlewares/authHandler");

function routerApi(app) {
        const router = express.Router();
        // app.get("/", express.static("public"));
        app.get("/", (req, res, next) => {
                res.status(200).json({
                        message: "Succeed",
                        data: "Bienvenido"
                })
        } );
        app.use("/api/v1", router);
        //Servicios Tecnomix
        router.use("/tecnomix", authorizationHandler, tecnomixRouter);
}

module.exports = routerApi;