import Person from "../models/Person.js";
import User from "../models/User.js";

function getPersons() {
  return Person.find({}).then((persons) => persons);
}

function getPerson(id) {
  return Person.findById(id).then((person) => person);
}

async function createPerson({ name, number }, decodedToken) {
  const user = await User.findById(decodedToken.id);

  const person = new Person({
    name,
    number,
    user: user.id,
  });

  const savedPerson = await person.save();

  user.people = user.people.concat(savedPerson._id);
  await user.save();

  return savedPerson;
}

function deletePerson(id) {
  return Person.findByIdAndDelete(id).then((returnedStatus) => returnedStatus);
}

function editPerson(id, newPerson) {
  return Person.findByIdAndUpdate(id, newPerson, { new: true }).then(
    (updatedPerson) => updatedPerson
  );
}

export default {
  getPerson,
  getPersons,
  createPerson,
  deletePerson,
  editPerson,
};
