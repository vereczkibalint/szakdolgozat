import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import ApiError from "./ApiError";

@Catch(ApiError)
export class ApiErrorExceptionFilter implements ExceptionFilter {
  catch(exception: ApiError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      message: exception.message
    });
  }
}