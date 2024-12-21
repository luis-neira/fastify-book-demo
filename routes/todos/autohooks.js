'use strict'

const fp = require('fastify-plugin')
const schemas = require('./schemas/loader')

module.exports = fp(async function todoAutoHooks (fastify, opts) {
  const todos = fastify.mongo.db.collection('todos')

  fastify.register(schemas)

  fastify.decorate('mongoDataSource', {
    async createTodo ({ title }) {
      const _id = new fastify.mongo.ObjectId()
      const now = new Date()
      const { insertedId } = await todos.insertOne({
        _id,
        title,
        done: false,
        id: _id,
        createdAt: now,
        modifiedAt: now
      })

      return insertedId
    }
  })
})
