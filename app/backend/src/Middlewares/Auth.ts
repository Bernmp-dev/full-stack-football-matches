import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { JwtPayload } from '../Interfaces/Jwt';

class AuthMiddleware {
  protected config: jwt.SignOptions;
  protected secretKey: string;

  constructor() {
    this.config = { expiresIn: '360d', algorithm: 'HS256' };
    this.secretKey = process.env.JWT_SECRET || 'secret';
  }

  public validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization) return res.status(401).json({ message: 'Token not found' });

      const { email, role } = jwt.verify(authorization, this.secretKey) as JwtPayload;
      res.locals.user = { email, role };

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default AuthMiddleware;
