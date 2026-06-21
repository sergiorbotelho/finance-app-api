import { CreateUserController } from "./create-user";

describe("Create User Controller", () => {
  class CreateUserUseCaseStub {
    execute(user) {
      return user;
    }
  }
  it("should return 201 when creating an user successfully", async () => {
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCase);

    const httpRequest = {
      body: {
        first_name: "Sergio",
        last_name: "Botelho",
        email: "sergio@teste.com",
        password: "12345678",
      },
    };

    const result = await createUserController.execute(httpRequest);

    expect(result.statusCode).toBe(201);
    expect(result.body).toBe(httpRequest.body);
  });
});
