import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/index.js";
export class UpdateUserCase {
  constructor(postgresUpdateUserRepository) {
    this.postgresUpdateUserRepository = postgresUpdateUserRepository;
  }

  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

      const userWidthProvidedEmail =
        await postgresGetUserByEmailRepository.execute(updateUserParams.email);

      if (userWidthProvidedEmail && userWidthProvidedEmail.id !== userId) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    const user = {
      ...updateUserParams,
    };

    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await this.postgresUpdateUserRepository.execute(
      userId,
      user,
    );

    return updatedUser;
  }
}
