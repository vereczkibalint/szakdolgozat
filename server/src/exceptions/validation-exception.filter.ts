import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';

@Catch(Error.ValidationError)
export class ValidatorErrorFilter implements ExceptionFilter {
  catch(exception: Error.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errors = [];

    // @ts-ignore
    Object.values(exception.errors).forEach(({ properties }) => {
      errors.push({ path: properties.path, message: properties.message });
    })

    response.status(400).json({
      errors
    });
  }
}