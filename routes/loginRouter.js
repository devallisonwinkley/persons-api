import express from "express";
import loginController from "../controllers/loginController.js";

const loginRouter = new express.Router();

loginRouter.post("/", loginController.login);

export default loginRouter;
