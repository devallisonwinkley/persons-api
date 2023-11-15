import userService from "../services/userService.js";

function getUsers(req, res, next) {
  userService.getUsers().then((users) => res.json(users));
}

function createUser(req, res, next) {
  const body = req.body;

  userService
    .createUser(body)
    .then((savedUser) => res.status(201).json(savedUser))
    .catch((error) => next(error));
}

export default {
  createUser,
  getUsers,
};
