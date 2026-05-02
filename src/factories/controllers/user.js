import {
  CreateUserController,
  DeleteUserController,
  GetUserBalanceController,
  GetUserByIdController,
  UpdateUserController,
} from "../../controllers/index.js";
import {
  PostgreesGetUserBalanceRepository,
  PostgresCreateUserRepository,
  PostgresDeleteUser,
  PostgresGetUserByIdRepository,
  PostgresUpdateUserRepository,
} from "../../repositories/postgres/index.js";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserBalanceUseCase,
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
export const makeGetUserBalanceController = () => {
  const getUserBalanceRepository = new PostgreesGetUserBalanceRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const getUserBalanceUseCase = new GetUserBalanceUseCase(
    getUserBalanceRepository,
    getUserByIdRepository,
  );

  const getUserBalanceController = new GetUserBalanceController(
    getUserBalanceUseCase,
  );

  return getUserBalanceController;
};
