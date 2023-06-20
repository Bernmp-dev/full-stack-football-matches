import { ModelStatic } from 'sequelize';
import { UserInterface } from '../Interfaces/Users';
import UserModel from '../database/models/User';

class UserService {
  constructor(
    private userModel: ModelStatic<UserModel>,
  ) {}

  async userLogin(
    email: UserInterface['email'],
  ): Promise<UserInterface | null> {
    //
    const user = this.userModel.findOne({
      where: { email },
    });

    return user;
  }
}

export default UserService;
