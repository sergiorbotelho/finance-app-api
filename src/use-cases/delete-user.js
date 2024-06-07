import { PostgresDeleteUser } from "../repositories/postgres/delete-user.js";

export class DeleteUserUseCase {
  async execute(userId) {
    const postgresDeleteUserRepository = new PostgresDeleteUser();

    const deleteUser = postgresDeleteUserRepository.execute(userId);

    return deleteUser;
  }
}
