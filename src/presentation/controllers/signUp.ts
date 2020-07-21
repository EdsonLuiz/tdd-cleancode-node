import {
  HttpResponse,
  HttpRequest,
  EmailValidator,
  Controller,
} from '../protocols';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
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

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'));

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) return badRequest(new InvalidParamError('email'));

      return {} as HttpResponse;
    } catch (err) {
      return serverError();
    }
  }
}

export default SignUpController;
