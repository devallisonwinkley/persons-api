import personService from "../services/personService.js";

function getPersons(_req, res) {
  personService.getPersons().then((persons) => res.json(persons));
}

function getPerson(req, res) {
  const id = req.params.id;

  personService.getPerson(id).then((person) => res.json(person));
}

function createPerson(req, res) {
  personService
    .createPerson(req.body)
    .then((savedPerson) => res.json(savedPerson));

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

  personService.deletePerson(id).then((_returnedStatus) => res.status(204).end);
}

export default {
  getPersons,
  getPerson,
  createPerson,
  deletePerson,
};
