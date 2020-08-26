import { HttpRequest, HttpResponse, Controller } from '@/presentation/protocols/';
import { badRequest } from '@/presentation/helpers/http-helper';
import { MissingParamError, InvalidParamError } from '@/presentation/errors';
import { EmailValidator } from '../signUp/signup-protocols';

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;
    if (!email) {
      return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))));
    }
    if (!password) {
      return new Promise((resolve) => resolve(badRequest(new MissingParamError('password'))));
    }
    const isValid = this.emailValidator.isValid(email);

    if (!isValid) {
      return new Promise((resolve) => resolve(badRequest(new InvalidParamError('email'))));
    }
    return new Promise((resolve) => resolve({} as HttpResponse));
  }
}
