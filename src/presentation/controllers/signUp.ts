import {
  HttpResponse,
  HttpRequest,
  EmailValidator,
  Controller,
} from '../protocols';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { AddAccount } from '../../domain/usecases/AddAccount';

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      const noPresentField = requiredField.find((field) => !httpRequest.body[field]);

      if (noPresentField) return badRequest(new MissingParamError(noPresentField));

      const {
        name, email, password, passwordConfirmation,
      } = httpRequest.body;

      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'));

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) return badRequest(new InvalidParamError('email'));

      this.addAccount.add({
        name,
        email,
        password,
      });

      return {} as HttpResponse;
    } catch (err) {
      return serverError();
    }
  }
}

export default SignUpController;
