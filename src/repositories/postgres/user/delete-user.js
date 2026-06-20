import { prisma } from "../../../../prisma/prisma.js";

export class PostgresDeleteUser {
  async execute(userId) {
    try {
      return await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return null;
    }
  }
}
