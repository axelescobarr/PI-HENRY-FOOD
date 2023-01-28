/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
  summary: 'La milanesa es un filete de carne marinado en huevos con condimenntos y empanizado',
  steps: ["1 corte el filete de carne, 2 prepare en un bowl 3 huevos con condimentos a gusto y mexcle todo, 3 pase la milanesa por pan rayado"],
  diets: ["ketogenic", "whole 30"],
  healthScore: 85
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should return recipes when searching by name', () =>
      agent.get('/recipes?name=milanesa').expect(200)
    );
    it('should return recipes when searching by name', () =>
      agent.get('/recipes?name=napolitana').expect(200)
    );
  });
});
