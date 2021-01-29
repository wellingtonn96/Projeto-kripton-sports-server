import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { jwt } from '@config/auth';
import AppError from '@shared/errors/AppError';

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('jwt token is missing');
  }

  /* Bearer dsfsfsfdfdadfafafdfsf */
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, jwt.secret);

    const { sub } = decoded as tokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token');
  }
}

export { ensureAuthenticated };
