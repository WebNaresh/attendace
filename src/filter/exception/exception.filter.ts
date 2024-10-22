import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(
      `🚀 ~ file: exception.filter.ts:13 ~ AllExceptionsFilter ~ exception:`,
      exception,
    );
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Default error message for server-side errors
    let message = 'An unexpected error occurred. Please try again later.';

    // Handle specific HttpExceptions thrown by Guards
    if (exception instanceof UnauthorizedException) {
      message = 'Unauthorized access. Please log in.';
      status = HttpStatus.UNAUTHORIZED; // 401 Unauthorized
    } else if (exception instanceof ForbiddenException) {
      message =
        'Access denied. You do not have permission to perform this action.';
      status = HttpStatus.FORBIDDEN; // 403 Forbidden
    } else if (exception instanceof NotFoundException) {
      // Handle 404 Not Found exception with specific message check
      const errorMessage = exception.message;

      // Custom handling for specific "User not found" case
      if (errorMessage.includes('User not found in interested list')) {
        message = 'The specified user is not in the interested list.';
      } else {
        message = `The resource was not found.`;
      }

      status = HttpStatus.NOT_FOUND; // 404 Not Found
    }
    // Custom handling for Prisma errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': // Unique constraint failed
          const target = (exception.meta?.target as string[]) ?? [];
          const uniqueField = target.join(', ');
          message = `A record with this ${uniqueField} already exists.`;
          status = HttpStatus.CONFLICT; // 409 Conflict
          break;
        case 'P2003': // Foreign key constraint failed
          message = 'Foreign key constraint violation.';
          status = HttpStatus.BAD_REQUEST; // 400 Bad Request
          break;
        case 'P2025': // Record not found
          message =
            'The record you are trying to update or delete does not exist.';
          status = HttpStatus.NOT_FOUND; // 404 Not Found
          break;
        default:
          message = 'A database error occurred.';
          break;
      }
    } else if (exception instanceof HttpException) {
      // Other HttpExceptions
      message = exception.message;
    } else if (exception.response) {
      // Handle non-HttpException responses, like validation errors
      if (Array.isArray(exception.response.message)) {
        message = exception.response.message.join(', ');
      } else {
        message = exception.response.message || 'Unknown error';
      }
    }

    // Send the error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}
