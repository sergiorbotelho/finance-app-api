import {
  checkIdIsValid,
  invalidIdResponse,
  ok,
  serverError,
} from "../helpers/index.js";

export class DeleteTransactionController {
  constructor(deleteTransactionUseCase) {
    this.deleteTransactionUseCase = deleteTransactionUseCase;
  }
  async execute(httpRequest) {
    try {
      const idIsValid = checkIdIsValid(httpRequest.params.id);

      if (!idIsValid) {
        return invalidIdResponse();
      }
      const transactioon = await this.deleteTransactionUseCase.execute(
        httpRequest.params.id,
      );

      return ok(transactioon);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
