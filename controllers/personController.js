import personService from "../services/personService.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

function getPerson(req, res, next) {
  const id = req.params.id;

  personService
    .getPerson(id)
    .then((person) => {
      if (!person) {
        return res.status(404).end();
      }

      return res.json(person);
    })
    .catch((error) => next(error));
}

function getPersons(_req, res) {
  personService.getPersons().then((persons) => res.json(persons));
}

function createPerson(req, res, next) {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, config.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ errror: "invalid token" });
  }

  // if (body.name === undefined) {
  //   return res.status(400).json({ error: "content missing" });
  // }

  personService
    .createPerson(body, decodedToken)
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));

  // if (!body.name && !body.number) {
  //   return res.status(400).json({ error: "content missing" });
  // }

  // INSERT INTO people (name, number) VALUES ($body.name, $body.number) >> SQL SAMPLE SYNTAX VIA SQL
}

function deletePerson(req, res) {
  // MY CODE
  // const id = req.params.id;
  // Person.findByIdAndDelete(id).then((person) =>
  //   res.status(204).json(person)
  // );

  // CODE NI COACH
  const id = req.params.id;

  personService
    .deletePerson(id)
    .then((_returnedStatus) => res.status(204).end)
    .catch((error) => next(error));
}

function editPerson(req, res, next) {
  const id = req.params.id;
  const { name, number } = req.body;

  const newPerson = {
    name,
    number,
  };

  personService
    .editPerson(id, newPerson)
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).end();
      }

      return res.json(updatedPerson);
    })
    .catch((error) => next(error));
}

export default {
  getPersons,
  getPerson,
  createPerson,
  deletePerson,
  editPerson,
};
