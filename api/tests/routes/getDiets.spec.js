const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Diet, conn } = require('../../src/db.js');

const agent = session(app);
const diet = {
  name: 'ketogenic',
};

describe('Diets routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Diet.sync({ force: true })
    .then(() => Diet.create(diet)));
  describe('GET /diets', () => {
    it('should return recipes when searching by name', () =>
      agent.get('/diets').expect(200)
    );
  });
});
