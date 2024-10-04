const express = require("express");
const usersRouter = require("./usersRouting");
const worksRouter = require("./worksRouting");
const todosRouter = require("./todosRouting");
const reservationsRouter = require("./reservationsRouting");
const canchaRouter = require("./canchaRouting");
const { authorizationHandler } = require("../middlewares/authHandler");

function routerApi(app) {
        const router = express.Router();
        app.get("/", (req, res, next) => {
                res.status(200).json({
                        message: "Succeed",
                        data: "Bienvenido"
                })
        } );
        app.use("/api/v1", router);
        //Servicios Tecnomix
        router.use("/users", authorizationHandler, usersRouter);
        router.use("/works", authorizationHandler, worksRouter);
        router.use("/todomanager", authorizationHandler, todosRouter);
        router.use("/reservations", authorizationHandler, reservationsRouter);
        router.use("/canchareserva", authorizationHandler,canchaRouter);
}

module.exports = routerApi;