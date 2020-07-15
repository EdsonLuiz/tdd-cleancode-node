import { HttpResponse, HttpRequest } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';

class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    let httpResponse = {} as HttpResponse;

    const requiredField = ['name', 'email', 'password', 'passwordConfirmation'];

    httpResponse = requiredField.reduce((_httpResponse, field) => {
      if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
      return _httpResponse;
    }, {} as HttpResponse);

    return httpResponse;
  }
}

export default SignUpController;
