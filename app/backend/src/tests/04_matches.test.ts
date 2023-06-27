import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import MatchesService from '../services/Matches';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesModel from '../database/models/Matches';
import { matchesMock } from './mocks/matches';

chai.use(chaiHttp);
const { expect } = chai;

  describe('GET /matches', function() {

    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(MatchesService,'listMatches')
      .resolves(matchesMock as MatchesModel['dataValues'][]);
    });
    
    afterEach(() => {
      sandbox.restore();
    });

    it('Retorna todos os matches quando nenhum filtro é informado', async function() {
      const res = await chai.request(app).get('/matches');

      expect(res.status).to.eq(200);
      expect(res.body).to.deep.equal(matchesMock);
    });

    it('Retorna somente os matches em progresso quando o filtro inProgress=true é informado', async function() {
      const res = await chai.request(app).get('/matches?inProgress=true');
      
      expect(res.status).to.eq(200);
      expect(res.body).to.deep.equal([matchesMock[1]]);
    });

    it('Retorna somente os matches concluídos quando o filtro inProgress=false é informado', async function() {
      const res = await chai.request(app).get('/matches?inProgress=false');


      expect(res.status).to.eq(200);
      expect(res.body).to.deep.equal([matchesMock[0]]);
    });

    it('Retorna status 400 em caso de erro de banco de dados', async function() {
      sandbox.restore(); 
      sandbox.stub(MatchesService, 'listMatches').rejects();
        
      const res = await chai.request(app).get('/matches');

      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq('Database Erro');
    });

  });