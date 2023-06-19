// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { teamsMock } from './mocks/teams';


chai.use(chaiHttp);

const { expect } = chai;

describe('GET "/teams"', function() {
  it('Retorna listagem de times e status 200', async function() {
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.deep.eq(teamsMock);
  });
});
