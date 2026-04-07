/* eslint-disable no-undef */
import "dotenv/config";
import express from "express";

import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from "./src/controllers/index.js";
import { PostgresGetUserByIdRepository } from "./src/repositories/postgres/get-user-by-id.js";
import { PostgresUpdateUserRepository } from "./src/repositories/postgres/update-user.js";
import { GetUserByIdUseCase } from "./src/use-cases/get-user-by-id.js";
import { UpdateUserCase } from "./src/use-cases/update-user.js";
const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const createUserController = new CreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).json(body);
});

app.patch("/api/users/:userId", async (req, res) => {
  const updateUserCaseRepository = new PostgresUpdateUserRepository();

  const updateUserCase = new UpdateUserCase(updateUserCaseRepository);

  const updateUserController = new UpdateUserController(updateUserCase);

  const { statusCode, body } = await updateUserController.execute(req);

  res.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).json(body);
});

app.delete("/api/users/:userId", async (req, res) => {
  const deleteUserControoler = new DeleteUserController();

  const { statusCode, body } = await deleteUserControoler.execute(req);

  res.status(statusCode).json(body);
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`),
);
