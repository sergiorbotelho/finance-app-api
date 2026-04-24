/* eslint-disable no-undef */
import "dotenv/config";
import express from "express";

import {
  makeCreateTransactionController,
  makeGetTransactionsByUserIdController,
} from "./src/factories/controllers/transaction.js";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from "./src/factories/controllers/user.js";
const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const createUserController = makeCreateUserController();

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).json(body);
});

app.patch("/api/users/:userId", async (req, res) => {
  const updateUserController = makeUpdateUserController();

  const { statusCode, body } = await updateUserController.execute(req);

  res.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(req);

  res.status(statusCode).json(body);
});

app.delete("/api/users/:userId", async (req, res) => {
  const deleteUserControoler = makeDeleteUserController();

  const { statusCode, body } = await deleteUserControoler.execute(req);

  res.status(statusCode).json(body);
});

app.get("/api/transactions", async (req, res) => {
  const getTransactionsByUserIdController =
    makeGetTransactionsByUserIdController();
  const { statusCode, body } =
    await getTransactionsByUserIdController.execute(req);
  res.status(statusCode).json(body);
});

app.post("/api/transactions", async (req, res) => {
  const createTransactionController = makeCreateTransactionController();

  const { body, statusCode } = await createTransactionController.execute(req);

  res.status(statusCode).json(body);
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`),
);
