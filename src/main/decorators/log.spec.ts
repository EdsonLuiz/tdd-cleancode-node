import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import LogControllerDecorator from './log';

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: httpRequest.body,
      };
      return new Promise((resolve) => resolve(httpResponse));
    }
  }

  return new ControllerStub();
};

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);
  return { sut, controllerStub };
};

describe('Log Controller Decorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
