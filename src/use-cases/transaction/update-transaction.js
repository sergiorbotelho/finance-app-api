import { UserNotFoundError } from "../../errors/user.js";

export class UpdateTransactionUseCase {
  constructor(updateTransactionRepository, getTransactionByIdRepository) {
    this.updateTransactionRepository = updateTransactionRepository;
    this.getTransactionByIdRepository = getTransactionByIdRepository;
  }

  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);
    if (!user) {
      throw UserNotFoundError(params.userId);
    }
    const transaction = await this.updateTransactionRepository.execute(params);
    return transaction;
  }
}
