import { MissingParamError, InvalidParamError } from '@/presentation/errors';
import {
  HttpResponse,
  HttpRequest,
  Controller,
  EmailValidator,
  AddAccount,
} from '@/presentation/controllers/signUp/signup-protocols';
// import { MissingParamError, InvalidParamError } from '../../errors';
import {
  badRequest,
  serverError,
  ok,
} from '@/presentation/helpers/http-helper';

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      const noPresentField = requiredField.find(
        (field) => !httpRequest.body[field],
      );

      if (noPresentField) return badRequest(new MissingParamError(noPresentField));

      const {
        name, email, password, passwordConfirmation,
      } = httpRequest.body;

      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'));

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) return badRequest(new InvalidParamError('email'));

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (err) {
      return serverError(err);
    }
  }
}

export default SignUpController;
