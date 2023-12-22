// imports
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
const { users } = require('../data/seeds/01-users')
const { PASSWORD } = require('./secrets')

// sanity check
describe('sanity check', () => {
  test('sanity', () => {
    expect(true).toBe(true)
  })
})

// setup
beforeEach(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

// TESTS
describe('auth', () => {

  // registration
  describe('[1] registration', () => {
    test('[a] responds with proper error if username is taken', async () => {
      const response = await request(server)
        .post('/api/auth/register')
        .send({username: users[0].username, password: 'whatever'})
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

  // login
  describe('[2] login', () => {
    test('[a] responds with proper error if credentials are invalid', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({username: users[0].username, password: 'whatever'})
      expect(response.body).toMatchObject({message: 'invalid credentials'})
    })
    test('[b] response contains token on proper login', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({username: users[0].username, password: PASSWORD})
      
      expect(response.body.token).toBeDefined()
    })
    test('[c] proper error is given if username or password are missing', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({username: users[0].username})
      expect(response.body).toMatchObject({message: 'username and password required'})
    })
  })
})