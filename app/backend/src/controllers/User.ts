import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import AuthMiddleware from '../Middlewares/Auth';
import UserService from '../services/User';

class UserController extends AuthMiddleware {
  constructor(private userService: UserService) {
    super();
  }

  async userLogin(req: Request, res: Response): Promise<Response> {
    try {
      const { email, role } = await this.userService.userLogin(req.body.email);

      const token = jwt.sign({ email, role }, this.secretKey, this.config);
      return res.status(200).json({ token });
    } catch (error) {
      const message = error as Error;
      return res.status(400).json({ message });
    }
  }

  async userRole(_req: Request, res: Response): Promise<Response> {
    try {
      const { email } = res.locals.user;
      const { role } = await this.userService.userLogin(email); // ???

      return res.status(200).json({ role });
    } catch (error) {
      const message = error as Error;
      return res.status(400).json({ message });
    }
  }
}

export default UserController;
