import { badRequest } from '@/presentation/helpers/http-helper';
import { MissingParamError, InvalidParamError } from '@/presentation/errors';
import { LoginController } from './login';
import { EmailValidator } from '../signUp/signup-protocols';

class EmailValidatorStub implements EmailValidator {
  public isValid(email: string): boolean {
    return true;
  }
}
let sut: LoginController;
let emailValidatorStub: EmailValidator;

describe('Login Controller', () => {
  beforeEach(() => {
    emailValidatorStub = new EmailValidatorStub();
    sut = new LoginController(emailValidatorStub);
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

  it('Should return 400 if invalid email is provided', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'invalid@email.com',
        password: 'valid_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });

  it('Should call EmailValidator with correct email', async () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        email: 'valid@email.com',
        password: 'valid_password',
      },
    };
    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith('valid@email.com');
  });
});
