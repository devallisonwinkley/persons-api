import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import Person from "./models/Person.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

// Express has a built-in middleware/method
app.use(express.json()); // this is how we activate the json parser and needs to be placed on top so it can run first prior to the methods/requests

// cors will enable our API to be expoosed to any client that wants to access the resource
app.use(cors());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
app.use(express.static("dist"));

function unknownEndPoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

// function generateId() {
//   const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

//   return maxId + 1;
// }

app.get("/", (request, response) => {
  response.send("<h1>Hello, Express!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => response.status(200).json(person));
});

// Creating and Saving objects - POST REQUEST
// const person = new Person({
//   name: "Arto Hellas",
//   number: "1233214567",
// });

// person.save().then((result) => {
//   console.log("Person saved!");
//   mongoose.connection.close();
// });

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number || false,
  });

  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson);
  });

  // INSERT INTO people (name, number) VALUES ($body.name, $body.number) >> SAMPLE SYNTAX VIA SQL
});

// Deleting single objecy from databse = DELETE : ID
// Person.findByIdAndDelete("654d3a0620924428dd8221b7").then((result) => {
//   console.log("Person has been deleted!");
//   mongoose.connection.close();
// });

app.delete("/api/persons/:id", (request, response) => {
  // MY CODE
  // const id = request.params.id;
  // Person.findByIdAndDelete(id).then((person) =>
  //   response.status(204).json(person)
  // );

  // CODE NI COACH
  const id = request.params.id;
  Person.findByIdAndDelete(id).then((returnedStatus) => {
    console.log(returnedStatus);
    response.status(204).end();
  });
});

app.use(unknownEndPoint);

app.listen(PORT, () => {
  console.log(`Our server is now running on ${PORT}`);
});
