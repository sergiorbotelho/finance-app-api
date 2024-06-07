import { DeleteUserUseCase } from "../use-cases/delete-user.js";
import {
  serverError,
  checkIdIsValid,
  invalidIdResponse,
  ok,
  userNotFoundResponse,
} from "./helpers/index.js";

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = checkIdIsValid(userId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const deleteUserUseCase = new DeleteUserUseCase();

      const deleteUser = await deleteUserUseCase.execute(userId);

      if (!deleteUser) {
        return userNotFoundResponse();
      }

      return ok(deleteUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
