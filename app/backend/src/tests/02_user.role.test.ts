import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { app } from '../app';
import { tokenMock, userMock } from './mocks/users';
// @ts-ignore
import chaiHttp = require('chai-http');


chai.use(chaiHttp);

const { expect } = chai;

describe('GET "/login/role"', function() {

    let sandbox: sinon.SinonSandbox;

  
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
  
    afterEach(() => {
      sandbox.restore();
    });

  it('Ao passar corpo correto retorna status 200 e a role do usuario', async function() {
    sandbox.stub(jwt, 'verify').callsFake(() => userMock);

    const response = await chai.request(app)
      .get('/login/role').set('Authorization', tokenMock.token);

    expect(response.status).to.be.eq(200);
    expect(response.body).to.have.property("role", userMock.role);
  });

  it('Caso o token não seja informado retorna status 401 e "Token not found"', async function() {
    sandbox.stub(jwt, 'verify').callsFake(() => userMock);

    const response = await chai.request(app)
      .get('/login/role').set('Authorization', '');

    expect(response.status).to.be.eq(401);
    expect(response.body).to.have.property("message", 'Token not found');
  });

  it('Caso o token seja invalido retorna status 401 e "Token must be a valid token"', async function() {
    sandbox.stub(jwt, 'verify').callsFake(() => undefined);

    const response = await chai.request(app)
      .get('/login/role').set('Authorization', 'Token Invalido');

    expect(response.status).to.be.eq(401);
    expect(response.body).to.have.property("message", 'Token must be a valid token');
  });
});
