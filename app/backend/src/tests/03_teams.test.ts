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

describe('GET "/teams/:id"', function() {
  it('Retorna time por id e status 200', async function() {
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).eq(200);
    expect(response.body).deep.eq(teamsMock[0]);
  });

  it('Retorna "Not Found" e status 404', async function() {
    const response = await chai.request(app).get('/teams/999');

    expect(response.status).eq(404);
    expect(response.body.message).eq('Not Found');
  });
});