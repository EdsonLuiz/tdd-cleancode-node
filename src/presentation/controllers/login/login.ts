import {
  HttpRequest,
  HttpResponse,
  Controller,
} from '@/presentation/protocols/';
import { badRequest } from '@/presentation/helpers/http-helper';
import { MissingParamError } from '@/presentation/errors';

export class LoginController implements Controller {
  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))));
  }
}
