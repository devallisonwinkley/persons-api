import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://devallisonwinkley:${password}@cluster0.bzdxwga.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Creating and Saving objects - POST REQUEST
const person = new Person({
  name: "Arto Hellas",
  number: "1233214567",
});

person.save().then((result) => {
  console.log("Person saved!");
  mongoose.connection.close();
});

// Fetching objects from Database - GET ALL REQUEST
Person.find({}) // find all objects in person table
  .then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
  });

// Fetching a single object from the database = GET :ID
Person.findById("654d3a3c20f61bf8863dede9").then((result) => {
  console.log(result);
  mongoose.connection.close();
});

// Deleting single objecy from databse = DELETE : ID
Person.findByIdAndDelete("654d3a0620924428dd8221b7").then((result) => {
  console.log("Person has been deleted!");
  mongoose.connection.close();
});
