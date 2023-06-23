import { NextFunction, Request, Response, Router } from 'express';
import AuthMiddleware from '../Middlewares/Auth';
import LoginMiddleware from '../Middlewares/LoginVal';
import UserController from '../controllers/User';
import UserModel from '../database/models/User';
import UserService from '../services/User';

const userRouter = Router();

const userService = new UserService(UserModel);
const userController = new UserController(userService);
const loginMiddleware = new LoginMiddleware(userService);
const authMiddleware = new AuthMiddleware();

userRouter.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    loginMiddleware.loginCheck(req, res, next);
  },
  (req: Request, res: Response, next: NextFunction) => {
    loginMiddleware.loginAuth(req, res, next);
  },
  (req: Request, res: Response) => {
    userController.userLogin(req, res);
  },
);

userRouter.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.validateToken(req, res, next);
  },
  (req: Request, res: Response) => userController.userRole(req, res),
);

export default userRouter;
