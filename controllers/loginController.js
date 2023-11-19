import loginService from "../services/loginService.js";

function login(req, res, next) {
  const body = req.body;

  loginService
    .login(body)
    .then((user) =>
      res
        .status(200)
        .json({ token: user.token, username: user.username, name: user.name })
    )
    .catch((error) => next(error));
}

export default {
  login,
};
