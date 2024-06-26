import { UpdateUserCase } from "../use-cases/update-user.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import {
  checkIdIsValid,
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidIdResponse,
  invalidPasswordResponse,
  badRequest,
  ok,
  serverError,
} from "./helpers/index.js";
export class UpdateUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const isIdValid = checkIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }
      const params = httpRequest.body;

      const allowedFields = ["first_name", "last_name", "email", "password"];

      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field)
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: "Some provided field is not allowed",
        });
      }

      if (params.password) {
        const passwordIsValid = checkIfPasswordIsValid(params.password);
        if (!passwordIsValid) {
          return invalidPasswordResponse();
        }
      }

      if (params.email) {
        const emailIsValid = checkIfEmailIsValid(params.email);

        if (!emailIsValid) {
          return emailIsAlreadyInUseResponse();
        }
      }

      const updateUserCase = new UpdateUserCase();

      const updatedUser = await updateUserCase.execute(userId, params);

      return ok(updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}
