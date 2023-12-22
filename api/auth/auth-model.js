const db = require('../../data/dbConfig')


async function addUser (user) {
  const id = await db('users').insert(user)
  const newUser = await findUser(id[0])

  return newUser
}

async function findUser (searchParam) {
  const field = searchParam === parseInt(searchParam) ? 'id' : 'username'
  const user = await db('users').where(field, searchParam).first()

  return user
}


module.exports = {
  addUser,
  findUser,
}