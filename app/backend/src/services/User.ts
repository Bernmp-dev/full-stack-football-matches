import { ModelStatic } from 'sequelize';
import { UserInterface } from '../Interfaces/Users';
import UserModel from '../database/models/User';

class UserService {
  constructor(
    private userModel: ModelStatic<UserModel>,
  ) {}

  async userLogin(
    email: UserInterface['email'],
  ): Promise<UserModel> {
    //
    const user = await this.userModel.findOne({
      where: { email },
    });

    return user?.dataValues;
  }
}

export default UserService;
