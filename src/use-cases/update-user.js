import { EmailAlreadyInUseError } from "../errors/user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";
import bcrypt from "bcrypt";
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user";
export class UpdateUserCase {
  async execute(userId, updateUserParams) {
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository();

    const userWidthProvidedEmail =
      await postgresGetUserByEmailRepository.execute(updateUserParams.email);

    if (userWidthProvidedEmail) {
      throw new EmailAlreadyInUseError(updateUserParams.email);
    }

    const user = {
      ...updateUserParams,
    };

    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);
      user.password = hashedPassword;
    }

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const updatedUser = await postgresUpdateUserRepository.execute(
      userId,
      user
    );

    return updatedUser;
  }
}
