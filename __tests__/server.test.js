// 'use strict';

// const { server } = require('../src/server.js');
// const superTest = require('supertest');
// const request = superTest(server);

'use strict';

const { app } = require('../src/server.js');
const superTest = require('supertest');
const request = superTest(app);

let id;


describe('API SERVER TEST', () => {
  it('Testing Home page', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello From the Other side');
  });
  it('Testing invalid routes', async () => {
    const response = await request.get('/anything');
    expect(response.status).toEqual(404);
  });
});



describe('Test Clothes', () => {
  it('Test getting empty clothes data using GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('No Data');
  });
  it('Test Creating new clothes using POST /clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      category: 'men',
      type: 'suits',
    });
    expect(response.status).toEqual(201);
    expect(response.body.data.category).toEqual('men');
    expect(response.body.data.type).toEqual('suits');
    id = response.body.id;
  });
  it('Test getting all clothes data using GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('Test getting specific clothes data using GET /clothes/id', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.data.type).toEqual('suits');
  });
  it(`Test throwing an error if ID doesn't exist using GET /clothes`, async () => {
    const response = await request.get(`/api/v1/clothes/1`);
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(`Invalid ID`);
  });
  it('Test updating data using PUT /clothes/id', async () => {
    const response = await request.put(`/api/v1/clothes/${id}`).send({
      category: 'women',
      type: 'dress',
    });
    expect(response.status).toEqual(200);
    expect(response.body.data.category).toEqual('women');
    expect(response.body.data.type).toEqual('dress');
  });
  it('should throwing an error when updating clothes with invalid ID using  PUT /clothes/id', async () => {
    const response = await request.put(`/api/v1/clothes/1`);
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(`Invalid ID`);
  });
  it('Test deleting clothes using delete /clothes/id', async () => {
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('No Data');
  });
});


describe('Test Food', () => {
  it('Test getting empty food data using GET /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('No Data');
  });
  it('Test Creating new food using POST /food', async () => {
    const response = await request.post('/api/v1/food').send({
      category: 'fast food',
      type: 'burger',
    });
    expect(response.status).toEqual(201);
    expect(response.body.data.category).toEqual('fast food');
    expect(response.body.data.type).toEqual('burger');
    id = response.body.id;
  });
  it('Test getting all food data using GET /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('Test getting specific food data using GET /food/id', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.data.type).toEqual('burger');
  });
  it(`Test throwing an error if ID doesn't exist using GET /food`, async () => {
    const response = await request.get(`/api/v1/food/1`);
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(`Invalid ID`);
  });
  it('Test updating data using PUT /food/id', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
      category: 'traditional',
      type: 'mansaf',
    });
    expect(response.status).toEqual(200);
    expect(response.body.data.category).toEqual('traditional');
    expect(response.body.data.type).toEqual('mansaf');
  });
  it('should throwing an error when updating food with invalid ID using  PUT /food/id', async () => {
    const response = await request.put(`/api/v1/food/1`);
    expect(response.status).toEqual(500);
    expect(response.body.error).toEqual(`Invalid ID`);
  });
  it('Test deleting food using delete /food/id', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('No Data');
  });
});
