import { HttpResponse, HttpRequest } from '../protocols/http';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      let httpResponse = {} as HttpResponse;

      const requiredField = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      httpResponse = requiredField.reduce((_httpResponse, field) => {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
        return _httpResponse;
      }, {} as HttpResponse);

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) httpResponse = badRequest(new InvalidParamError('email'));

      return httpResponse;
    } catch (err) {
      return serverError();
    }
  }
}

export default SignUpController;
