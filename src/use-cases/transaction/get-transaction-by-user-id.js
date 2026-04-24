import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactionsByIdUseCase {
  constructor(getTransactionsByUserIdRepository, geByIdRepository) {
    this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
    this.getUserByIdRepository = geByIdRepository;
  }
  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);
    if (!user) {
      throw UserNotFoundError(params.userId);
    }

    const transactions = await this.getTransactionsByUserIdRepository.execute(
      params.userId,
    );
    return transactions;
  }
}
