import {
  HttpRequest,
  HttpResponse,
  Controller,
} from '@/presentation/protocols/';
import { badRequest } from '@/presentation/helpers/http-helper';
import { MissingParamError } from '@/presentation/errors';

export class LoginController implements Controller {
  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))));
    }
    if (!httpRequest.body.password) {
      return new Promise((resolve) => resolve(badRequest(new MissingParamError('password'))));
    }
    return new Promise((resolve) => resolve({} as HttpResponse));
  }
}
