import { Request, Response } from 'express';
import TokenHandle from '../utils/auth';

class UserController extends TokenHandle {
  async userLogin(req: Request, res: Response): Promise<Response> {
    try {
      const { email, role } = req.body;

      const token = this.generateToken({ email, role });

      req.headers.authorization = token;
      return res.status(200).json({ token });
    } catch (error) {
      const message = error as Error;
      return res.status(200).json({ message });
    }
  }
}

export default UserController;
