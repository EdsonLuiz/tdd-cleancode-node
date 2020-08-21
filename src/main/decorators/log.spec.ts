import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { serverError } from '@/presentation/helpers/http-helper';
import { LogErrorRepository } from '@/data/protocols/log-error-repository';
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

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    public async log(stack: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new LogErrorRepositoryStub();
};

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub,
  );
  return { sut, controllerStub, logErrorRepositoryStub };
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

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: httpRequest.body,
    });
  });

  it('Should call LogErrorRepository with corret error if controller returns a serverError', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    const error = serverError(fakeError);
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');
    jest.spyOn(controllerStub, 'handle').mockResolvedValue(error);
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    await sut.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
