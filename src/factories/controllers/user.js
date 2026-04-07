import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from "../../controllers/index.js";
import {
  PostgresCreateUserRepository,
  PostgresDeleteUser,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from "../../repositories/postgres/index.js";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  UpdateUserCase,
} from "../../use-cases/index.js";

export const makeCreateUserController = () => {
  const createUserRepository = new PostgresCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(createUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};

export const makeUpdateUserController = () => {
  const updateUserCaseRepository = new PostgresUpdateUserRepository();
  const updateUserCase = new UpdateUserCase(updateUserCaseRepository);
  const updateUserController = new UpdateUserController(updateUserCase);

  return updateUserController;
};

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
};

export const makeDeleteUserController = () => {
  const deleteUserRepository = new PostgresDeleteUser();
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
  const deleteUserControoler = new DeleteUserController(deleteUserUseCase);

  return deleteUserControoler;
};
