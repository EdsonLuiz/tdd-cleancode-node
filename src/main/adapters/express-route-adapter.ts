import { Request, Response } from 'express';
import { Controller, HttpRequest } from '@/presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  let httpRequest: HttpRequest = {};
  return async (request: Request, response: Response) => {
    httpRequest = {
      body: request.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    }
    return response.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  };
};
