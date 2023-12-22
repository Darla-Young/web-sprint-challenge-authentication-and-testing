describe('sanity check', () => {
  test('sanity', () => {
    expect(true).toBe(true)
  })
})

const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const { users } = require('../data/seeds/01-users')

beforeEach(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy
})

describe('auth', () => {
  describe('[1] registration', () => {
    test('[a] responds with proper error if username is taken', async () => {
      const response = await request(server)
        .post('/api/auth/register')
        .send(users[0])
      expect(response.body).toMatchObject({message: 'username taken'})
    })
    test('[b] can add new user to the database', async () => {
      const response = await request(server)
        .post('/api/auth/register')
        .send({username: 'sal', password: 'whatever'})
      expect(response.status).toBe(201)
      expect(response.body).toMatchObject({username: 'sal'})
    })
    test('[c] proper error is given if username or password are missing', async () => {
      const response = await request(server)
        .post('/api/auth/register')
        .send({username: 'jim'})
      expect(response.body).toMatchObject({message: 'username and password required'})
    })
  })
  describe('[2] login', () => {
    test('[a] responds with proper error if credentials are invalid', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({username: 'bob', password: 'whatever'})
      expect(response.body).toMatchObject({message: 'invalid credentials'})
    })
    test('[b] response contains token on proper login', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send(users[0])
      expect(response.headers.authorization).toBeTruthy()
    })
    test('[c] proper error is given if username or password are missing', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({username: 'bob'})
      expect(response.body).toMatchObject({message: 'username and password required'})
    })
  })
})