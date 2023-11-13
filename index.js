import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import personRouter from "./routes/personRouter.js";

dotenv.config();

const app = express();
const PORT = 3001;
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

function unknownEndPoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

// Express has a built-in middleware/method
app.use(express.json()); // this is how we activate the json parser and needs to be placed on top so it can run first prior to the methods/requests

// cors will enable our API to be expoosed to any client that wants to access the resource
app.use(cors());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
app.use(express.static("dist"));
app.use("/api/persons", personRouter);
app.use(unknownEndPoint);

app.listen(PORT, () => {
  console.log(`Our server is now running on ${PORT}`);
});
