import * as bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import UserService from '../services/User';

class LoginMiddleware {
  private fieldsMessage: string;
  private invalidMessage: string;
  constructor(private userService: UserService) {
    this.fieldsMessage = 'All fields must be filled';
    this.invalidMessage = 'Invalid email or password';
  }

  public async loginCheck(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    //
    const { email, password } = req.body;
    const emailCheck = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!email || !password) {
      return res.status(400).json({ message: this.fieldsMessage });
    }

    if (!emailCheck.test(email) || password.length < 6) {
      return res.status(401).json({ message: this.invalidMessage });
    }

    return next();
  }

  public async loginAuth(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    //
    const { email, password } = req.body;
    const user = await this.userService.userLogin(email);

    if (!user) {
      return res.status(401).json({ message: this.invalidMessage });
    }

    const verifyPassword = bcrypt.compareSync(password, user.password);

    if (!verifyPassword) {
      return res.status(401).json({ message: this.invalidMessage });
    }

    return next();
  }
}

export default LoginMiddleware;
