import { Request, Response } from 'express';
import { Controller, HttpRequest } from '@/presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  let httpRequest: HttpRequest = {};
  return async (request: Request, response: Response) => {
    httpRequest = {
      body: request.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
