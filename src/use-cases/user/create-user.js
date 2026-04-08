import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcrypt";
import { EmailAlreadyInUseError } from "../../errors/user.js";
import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/index.js";

export class CreateUserUseCase {
  constructor(postgresCreateUserRepository) {
    this.postgresCreateUserRepository = postgresCreateUserRepository;
  }
  async execute(createUserParams) {
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository();

    const userWidthProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email);

    if (userWidthProvidedEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }
    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const createUser = await this.postgresCreateUserRepository.execute(user);

    return createUser;
  }
}
