import { HttpResponse, HttpRequest } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';

class SignUpController {
  static handle(httpRequest: HttpRequest): HttpResponse {
    let httpResponse = {} as HttpResponse;
    if (!httpRequest.body.name) {
      httpResponse = {
        statusCode: 400,
        body: new MissingParamError('name'),
      };
    }
    if (!httpRequest.body.email) {
      httpResponse = {
        statusCode: 400,
        body: new MissingParamError('email'),
      };
    }

    return httpResponse;
  }
}

export default SignUpController;
