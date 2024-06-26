/* eslint-disable no-undef */
import "dotenv/config";
import express from "express";

import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from "./src/controllers/index.js";

const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const createUserController = new CreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).json(body);
});

app.patch("/api/users/:userId", async (req, res) => {
  const updateUserController = new UpdateUserController();

  const { statusCode, body } = await updateUserController.execute(req);

  res.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdController = new GetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).json(body);
});

app.delete("/api/users/:userId", async (req, res) => {
  const deleteUserControoler = new DeleteUserController();

  const { statusCode, body } = await deleteUserControoler.execute(req);

  res.status(statusCode).json(body);
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
