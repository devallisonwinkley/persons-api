import User from "../models/User.js";
import bcrypt from "bcrypt";

function getUsers() {
  return User.find({})
    .populate("people", { name: 1, number: 1 })
    .then((users) => users);
}

async function createUser({ username, name, password }) {
  const saltRounds = 10; // how intense is the encryption
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // const user = new User({
  //   username,
  //   name,
  //   passwordHash,
  // });

  // const savedUser = await user.save();

  // return savedUser;

  return User.create({
    username,
    name,
    passwordHash,
  }).then((savedUser) => savedUser);
}

export default {
  createUser,
  getUsers,
};
