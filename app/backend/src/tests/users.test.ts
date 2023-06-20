// import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import UserModel from '../database/models/User';
import { loginMock, userMock } from './mocks/users';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST "/login"', function() {
  it('Retorna status 200 e um token', async function() {
    sinon.stub(UserModel,'findOne')
      .resolves(userMock as UserModel);

    sinon.stub(bcrypt, 'compareSync')
      .resolves(loginMock.password);

    const response = await chai.request(app)
      .post('/login')
      .send(loginMock)

    expect(response.status).to.be.eq(200);
    expect(response.body).to.have.property("token");
  });

  it('Retorna status 400 e "Invalid password"', async function() {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: loginMock.email,
        password: '',
      })

    expect(response.status).to.be.eq(400);
    expect(response.body.message).to.deep.eq('All fields must be filled');
  });

  it('Retorna status 400 e "Invalid email"', async function() {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: loginMock.email,
        password: '',
      })

    expect(response.status).to.be.eq(400);
    expect(response.body.message).to.deep.eq('All fields must be filled');
  });
});
