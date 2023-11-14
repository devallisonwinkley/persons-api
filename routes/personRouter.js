import express from "express";
import personController from "../controllers/personController.js";

const personRouter = express.Router();

personRouter.get("/", personController.getPersons);
personRouter.get("/:id", personController.getPerson);
personRouter.post("/", personController.createPerson);
personRouter.delete("/:id", personController.deletePerson);
personRouter.put("/:id", personController.editPerson);

export default personRouter;
