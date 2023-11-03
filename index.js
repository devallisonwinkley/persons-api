/*
// NODE.JS WAY WITHOUT FRAMEWORK

const http = require("http"); // common js way/version - can be converted into an ES6 module
// import http from "http"; - new way/version

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can only execute JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = http.createServer((request, response) => {
  // how to return an object
  response.writeHead(200, { "Content-Type": "/plain" });
  response.end("Hello, World!");

  // how to return JSON data
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Hello, NodeJS!" }));

  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;

app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
*/

// EXPRESS is a NODE.js framework in the back-end side
// EXPRESS (new, easier, and better way)

/** RESTful API CONVENTION
 
 * ROUTES           HTTP      ACTION                                            STATUS  
 
 * api/notes/:id    GET       fetch a single resource                            200 OK
 * api/notes        GET       fetch all resources                                200 OK
 * api/notes        POST      create a new resource                              201 Created
 * api/notes/:id    DELETE    delete a single resource                           204 No Content
 * api/notes/:id    PUT       replace the specified resource
 * api/notes/:id    PATCH     replaces a part of the specified resource
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = 3001;

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

// app.use(requestLogger);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "390-523532",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
];

function unknownEndPoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

// function requestLogger(request, response, next) {
// console.log(`Method: ${request.method}`);
// console.log(`Path: ${request.path}`);
// console.log(`Body: `, request.body);
// next();

function generateId() {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;

  return maxId + 1;
}

app.get("/", (request, response) => {
  response.send("<h1>Hello, Express!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.status(200).json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  response.status(200).json(person);
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name && !body.number) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number || false,
  };

  persons = persons.concat(person);

  response.status(201).json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.use(unknownEndPoint);

app.listen(PORT, () => {
  console.log(`Our server is now running on ${PORT}`);
});
