import SignUpController from './signUp';
import { MissingParamError } from '../errors/missing-param-error';

describe('SignUp Controller', () => {
  it('should return 400 if no name is provided', () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = SignUpController.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = SignUpController.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = SignUpController.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });
});
