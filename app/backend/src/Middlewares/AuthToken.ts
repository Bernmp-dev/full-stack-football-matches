import { NextFunction, Request, Response } from 'express';
import TokenHandle from '../utils/auth';

class Auth extends TokenHandle {
  public token(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const validate = this.validateToken(authorization);

    if (!validate) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }
}

export default Auth;
