import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";

export class CreateUserUseCase {
  async execute(createUserParams) {
    const postgresGetUserByemailRepository =
      new PostgresGetUserByEmailRepository();

    const userWidthProvidedEmail = await postgresGetUserByemailRepository(
      createUserParams.email
    );

    if (userWidthProvidedEmail) {
      throw new Error("The provided e-mail is aready in use.");
    }
    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const createUser = await postgresCreateUserRepository.execute(user);

    return createUser;
  }
}
