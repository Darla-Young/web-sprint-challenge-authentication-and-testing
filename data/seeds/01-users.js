const bcrypt = require('bcryptjs')
const { PASSWORD } = require('../../api/secrets')

const hash = bcrypt.hashSync(PASSWORD, 8)

const users = [
  {username: 'bob', password: hash}
]

exports.users = users

exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert(users)
    })
}