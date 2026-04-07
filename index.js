/* eslint-disable no-undef */
import "dotenv/config";
import express from "express";

import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from "./src/controllers/index.js";
import { PostgresCreateUserRepository } from "./src/repositories/postgres/create-user.js";
import { PostgresDeleteUser } from "./src/repositories/postgres/delete-user.js";
import { PostgresGetUserByIdRepository } from "./src/repositories/postgres/get-user-by-id.js";
import { PostgresUpdateUserRepository } from "./src/repositories/postgres/update-user.js";
import { CreateUserUseCase } from "./src/use-cases/create-user.js";
import { DeleteUserUseCase } from "./src/use-cases/delete-user.js";
import { GetUserByIdUseCase } from "./src/use-cases/get-user-by-id.js";
import { UpdateUserCase } from "./src/use-cases/update-user.js";
const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const createUserRepository = new PostgresCreateUserRepository();

  const createUserUseCase = new CreateUserUseCase(createUserRepository);

  const createUserController = new CreateUserController(createUserUseCase);

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
  const deleteUserRepository = new PostgresDeleteUser();

  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

  const deleteUserControoler = new DeleteUserController(deleteUserUseCase);

  const { statusCode, body } = await deleteUserControoler.execute(req);

  res.status(statusCode).json(body);
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`),
);
