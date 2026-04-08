import {
  checkIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
  userNotFoundResponse,
} from "../helpers/index.js";

export class GetUserByIdController {
  constructor(getUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }
  async execute(httpRequest) {
    // console.log(httpRequest.params?.userId);
    try {
      const isIdValid = checkIdIsValid(httpRequest?.params?.userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.getUserByIdUseCase.execute(
        httpRequest?.params?.userId,
      );

      if (!user) {
        return userNotFoundResponse();
      }
      return ok(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
