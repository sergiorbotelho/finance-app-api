import { prisma } from "../../../../prisma/prisma.js";

export class PostrgesCreateTransactionRepository {
  async execute(createTransactionParams) {
    return await prisma.transaction.create({
      data: createTransactionParams,
    });
  }
}
