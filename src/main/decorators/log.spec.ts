import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';
import { serverError, ok } from '@/presentation/helpers/http-helper';
import { LogErrorRepository } from '@/data/protocols/log-error-repository';
import { AccountModel } from '@/domain/models/account';
import LogControllerDecorator from './log';

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'valid_email@mail.com',
    name: 'valid_name',
    password: 'valid_password',
    passwordConfirmation: 'valid_password',
  },
});

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  email: 'valid_email@mail.com',
  name: 'valid_name',
  password: 'valid_password',
});

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise((resolve) => resolve(ok(makeFakeAccount())));
    }
  }

  return new ControllerStub();
};

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    public async logError(stack: string): Promise<void> {
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
    await sut.handle(makeFakeRequest());
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest());
  });

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAccount()));
  });

  it('Should call LogErrorRepository with corret error if controller returns a serverError', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');
    jest
      .spyOn(controllerStub, 'handle')
      .mockResolvedValue(makeFakeServerError());
    await sut.handle(makeFakeRequest());
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
