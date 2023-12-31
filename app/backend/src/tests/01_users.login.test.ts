import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { app } from '../app';
import UserModel from '../database/models/User';
import UserService from '../services/User';
import { loginMock, tokenMock, userMock } from './mocks/users';
// @ts-ignore
import chaiHttp = require('chai-http');


chai.use(chaiHttp);

const { expect } = chai;

  describe('POST "/login"', function() {
    let userService: UserService;
  
    beforeEach(() => {
      userService = new UserService(UserModel);
    });
  
    afterEach(() => {
      sinon.restore();
    });
      
  it('Ao passar corpo correto retorna status 200 e um token', async function() {
    sinon.stub(userService,'userLogin')
    .resolves(userMock as UserModel);

    sinon.stub(bcrypt, 'compareSync').resolves(true);

    sinon.stub(jwt, 'sign').callsFake(() => tokenMock.token);

    const response = await chai.request(app)
      .post('/login')
      .send(loginMock)

    expect(response.status).to.be.eq(200);
    expect(response.body).to.have.property("token");
  });

  it('Ao passar input de senha vazio retorna status 400 e "All fields must be filled"', async function() {
    const response = await chai.request(app)
      .post('/login')
      .send({ email: loginMock.email, password: '' })

    expect(response.status).to.be.eq(400);
    expect(response.body.message).to.deep.eq('All fields must be filled');
  });

  it('Ao passar input de email vazio retorna status 400 e "All fields must be filled"', async function() {
    const response = await chai.request(app)
      .post('/login')
      .send({ email: '', password: loginMock.password })

    expect(response.status).to.be.eq(400);
    expect(response.body.message).to.deep.eq('All fields must be filled');
  });

  it('Ao passar senha invalida retorna status 401 e "Invalid email or password"', async function() {
    const response = await chai.request(app)
      .post('/login')
      .send({ email: loginMock.email, password: 'sdfg' })

    sinon.stub(bcrypt, 'compareSync').resolves(false);

    expect(response.status).to.be.eq(401);
    expect(response.body.message).to.deep.eq('Invalid email or password');
  });

  it('Ao passar email invalido retorna status 401 e "Invalid email or password"', async function() {
    const response = await chai.request(app)
      .post('/login')
      .send({ email: 'sdfg', password: loginMock.password })

    expect(response.status).to.be.eq(401);
    expect(response.body.message).to.deep.eq('Invalid email or password');
  });
});
