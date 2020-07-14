import { HttpResponse, HttpRequest } from '../protocols/http';

class SignUpController {
  static handle(httpRequest: HttpRequest): HttpResponse {
    let httpResponse = {} as HttpResponse;
    if (!httpRequest.body.name) {
      httpResponse = {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }
    if (!httpRequest.body.email) {
      httpResponse = {
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    }

    return httpResponse;
  }
}

export default SignUpController;
