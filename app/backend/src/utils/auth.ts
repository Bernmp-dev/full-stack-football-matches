import jwt = require('jsonwebtoken');
import { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from '../Interfaces/Jwt';

class TokenHandle {
  private config: SignOptions;
  private secretKey: string;

  constructor() {
    this.config = { expiresIn: '7d', algorithm: 'HS256' };
    this.secretKey = process.env.JWT_SECRET || 'secret';
  }

  public generateToken = (payload: JwtPayload) => {
    try {
      const token = jwt.sign(payload, this.secretKey, this.config);

      return token;
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    }
  };

  public validateToken = (token: string) => {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      const { message } = error as Error;
      throw new Error(message);
    }
  };
}

export default TokenHandle;
