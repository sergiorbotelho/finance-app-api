import { PostgresDeleteUser } from "../repositories/postgres/delete-user";

export class DeleteUserUseCase {
  async execute(userId) {
    const postgresDeleteUserRepository = new PostgresDeleteUser();

    const deleteUser = postgresDeleteUserRepository.execute(userId);

    return deleteUser;
  }
}
