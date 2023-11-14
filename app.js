import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.js";
import personRouter from "./routes/personRouter.js";
import unknownEndPoint from "./middlewares/unknownEndpoint.js";
import connectToDB from "./utils/connectToDB.js";
import config from "./utils/config.js";

const app = express();

connectToDB(config.MONGODB_URI);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

// Express has built-in middlewares/methods

app.use(cors()); // cors will enable our API to be expoosed to any client that wants to access the resource

app.use(express.json()); // this is how we activate the json parser and needs to be placed on top so it can run first prior to the methods/requests

app.use(express.static("dist"));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);

app.use("/api/persons", personRouter);
app.use(unknownEndPoint);
app.use(errorHandler);

export default app;
