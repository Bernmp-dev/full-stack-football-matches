import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { } from 'sequelize';
import * as sinon from 'sinon';
import { app } from '../app';
import MatchesModel from '../database/models/Matches';
import { updateGoals } from './mocks/matches';
import { tokenMock, userMock } from './mocks/users';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('PATCH "/matches"', async function() {

  beforeEach(() => {
    sinon.restore();
  });


  it('retorna status 200 e realiza alteracao no progresso da partida', async function() {
    sinon.stub(MatchesModel,'update').resolves([null, 1] as any);
    sinon.stub(jwt, 'verify').callsFake(() => userMock);
    
    const res = await chai.request(app).patch('/matches/1/finish')
    .set('Authorization', tokenMock.token)
    

    expect(res.status).to.eq(200);
    expect(res.body.message).to.eq('Finished');
  })

  it('retorna status 400 e mensagem "Match ongoing" ', async function() {
    sinon.stub(MatchesModel,'update').resolves([null, 0] as any);
    sinon.stub(jwt, 'verify').callsFake(() => userMock);
    
    const res = await chai.request(app).patch('/matches/1/finish')
    .set('Authorization', tokenMock.token)
    

    expect(res.status).to.eq(400);
    expect(res.body.message).to.eq('Match ongoing');
  })

  it('retorna status 200 e mensagem "finished" ', async function() {
    sinon.stub(MatchesModel,'update').resolves([null, 1] as any);
    sinon.stub(jwt, 'verify').callsFake(() => userMock);
    
    const res = await chai.request(app).patch('/matches/1')
    .set('Authorization', tokenMock.token)
    .send(updateGoals);
    

    expect(res.status).to.eq(200);
    expect(res.body.message).to.eq('Finished');
  })

  it('retorna status 400 e mensagem "Invalid update" ', async function() {
    sinon.stub(MatchesModel,'update').resolves([null, 0] as any);
    sinon.stub(jwt, 'verify').callsFake(() => userMock);
    
    const res = await chai.request(app).patch('/matches/1')
    .set('Authorization', tokenMock.token)
    .send(updateGoals);
    

    expect(res.status).to.eq(400);
    expect(res.body.message).to.eq('Invalid update');
  })
})