import { badRequest } from '@/presentation/helpers/http-helper';
import { MissingParamError } from '@/presentation/errors';
import { LoginController } from './login';

let sut: LoginController;

describe('Login Controller', () => {
  beforeEach(() => {
    sut = new LoginController();
  });
  it('Should return 400 if no email is provided', async () => {
    const httpRequest = {
      body: {
        password: 'valid_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  it('Should return 400 if no password is provided', async () => {
    const httpRequest = {
      body: {
        email: 'valid@email.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });
});
