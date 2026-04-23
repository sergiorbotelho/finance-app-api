import { userNotFoundResponse } from "../../controllers/helpers";

export class GetTransactionsById {
  constructor(getTransactionsByUserIdRepository, geByIdRepository) {
    this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
    this.getUserByIdRepository = geByIdRepository;
  }
  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);
    if (!user) {
      return userNotFoundResponse();
    }

    const transactions = await this.getTransactionsByUserIdRepository.execute(
      params.userId,
    );
    return transactions;
  }
}
