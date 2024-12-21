'use strict'

module.exports = async function todoRoutes (fastify, _opts) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: async function listTodo (request, reply) {
      return { data: [], totalCount: 0 }
    }
  })

  fastify.route({
    method: 'POST',
    url: '/',
    handler: async function createTodo (request, reply) {
      return { id: '123' }
    }
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    handler: async function readTodo (request, reply) {
      return {}
    }
  })

  fastify.route({
    method: 'PUT',
    url: '/:id',
    handler: async function updateTodo (request, reply) {
      reply.code(204)
    }
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    handler: async function deleteTodo (request, reply) {
      reply.code(204)
    }
  })

  fastify.route({
    method: 'POST',
    url: '/:id/:status',
    handler: async function changeStatus (request, reply) {
      reply.code(204)
    }
  })
}
