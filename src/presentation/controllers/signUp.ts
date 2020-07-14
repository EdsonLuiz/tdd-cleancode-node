import { HttpResponse, HttpRequest } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';

class SignUpController {
  static handle(httpRequest: HttpRequest): HttpResponse {
    let httpResponse = {} as HttpResponse;
    if (!httpRequest.body.name) {
      httpResponse = badRequest(new MissingParamError('name'));
    }
    if (!httpRequest.body.email) {
      httpResponse = badRequest(new MissingParamError('email'));
    }

    return httpResponse;
  }
}

export default SignUpController;
