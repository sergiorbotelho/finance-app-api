import { v4 as uuidv4 } from "uuid";
import { UserNotFoundError } from "../../errors/user.js";
export class CreateTransactionUseCase {
  constructor(createTransactionRepository, getUserByIdRepository) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserbYIdRepository = getUserByIdRepository;
  }

  async execute(createTransactionParams) {
    const userId = createTransactionParams.userId;

    const user = await this.getUserbYIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactionId = uuidv4();

    const transaction = await this.createTransactionRepository.execute({
      ...createTransactionParams,
      id: transactionId,
    });

    return transaction;
  }
}
