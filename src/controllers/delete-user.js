import { DeleteUserUseCase } from "../use-cases/delete-user.js";
import {
  serverError,
  checkIdIsValid,
  invalidIdResponse,
  ok,
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

      const deleteUser = deleteUserUseCase.execute(userId);

      return ok(deleteUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
