const express = require("express");
const routerApi = require("./network");
const { logErrors, boomErrorHandler, mongoErrorHandler, defaultErrorHandler } = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

const whitelist = ["http://localhost:3000", "https://to-do-manager-delta.vercel.app", "https://ordermanager-murex.vercel.app"];

app.use(cors({origin: whitelist, methods: ["GET", "POST", "PATCH", "DELETE"]}));

app.use(express.json());

routerApi(app);

//Middlewares

app.use(logErrors);
app.use(boomErrorHandler);
app.use(mongoErrorHandler);
app.use(defaultErrorHandler);


app.listen(port, () => {
    console.log("My port: " + port);
});

